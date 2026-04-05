"""
PLFS Actual Data EDA — Comprehensive Exploratory Graphs
IIM Mumbai PPM | Data: PLFS Microdata (1.1M records)
"""
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import os

OUTPUT = os.path.join(os.path.dirname(__file__), "graphs_actual")
os.makedirs(OUTPUT, exist_ok=True)

# --- Load data ---
DATA = "/Users/adityaashok/Downloads/PLFS_selected.csv"
print("Loading PLFS data...")
df = pd.read_csv(DATA)
print(f"Loaded: {df.shape[0]:,} rows x {df.shape[1]} columns\n")

# --- Code mappings ---
SEX_MAP = {1: "Male", 2: "Female", 3: "Transgender"}
MARST_MAP = {1: "Never Married", 2: "Currently Married", 3: "Widowed", 4: "Divorced/Separated"}
EDU_MAP = {1: "Not literate", 2: "Literate (no school)", 3: "Below Primary", 4: "Primary",
           5: "Middle", 6: "Secondary", 7: "Higher Secondary", 8: "Diploma", 10: "Graduate",
           11: "PG & above", 12: "Graduate (Technical)", 13: "PG (Technical)"}
SAS_MAP = {11: "Self-employed (own account)", 12: "Self-employed (employer)",
           21: "Helper in HH enterprise", 31: "Regular wage/salaried",
           41: "Casual labour (public)", 51: "Casual labour (other)"}
STATE_MAP = {1: "J&K", 2: "HP", 3: "Punjab", 4: "Chandigarh", 5: "Uttarakhand",
             6: "Haryana", 7: "Delhi", 8: "Rajasthan", 9: "UP", 10: "Bihar",
             11: "Sikkim", 12: "Arunachal", 13: "Nagaland", 14: "Manipur",
             15: "Mizoram", 16: "Tripura", 17: "Meghalaya", 18: "Assam",
             19: "WB", 20: "Jharkhand", 21: "Odisha", 22: "Chhattisgarh",
             23: "MP", 24: "Gujarat", 25: "Daman", 26: "Dadra", 27: "Maharashtra",
             28: "AP", 29: "Karnataka", 30: "Goa", 31: "Lakshadweep",
             32: "Kerala", 33: "TN", 34: "Puducherry", 35: "A&N",
             36: "Telangana", 37: "Ladakh"}

df["sex_label"] = df["sex"].map(SEX_MAP)
df["marst_label"] = df["marst"].map(MARST_MAP)
df["edu_label"] = df["gedu_lvl"].map(EDU_MAP)
df["sas_label"] = df["sas"].map(SAS_MAP)
df["state_label"] = df["st"].map(STATE_MAP)

# Age groups
df["age_group"] = pd.cut(df["age"], bins=[0, 14, 17, 24, 29, 34, 44, 54, 64, 100],
                         labels=["0-14", "15-17", "18-24", "25-29", "30-34", "35-44", "45-54", "55-64", "65+"])

# Working age (15+)
df15 = df[df["age"] >= 15].copy()

# Employment status derived
df15["employed"] = df15["sas"].notna()
df15["in_lf"] = df15["employed"] | (df15["dur_unp"].notna())
df15["unemployed"] = (~df15["employed"]) & (df15["dur_unp"].notna())

# Earnings (combine regular + self)
df15["total_earnings"] = df15["ern_reg"] + df15["ern_self"]
df15.loc[df15["total_earnings"] == 0, "total_earnings"] = np.nan

# --- Styling ---
COLORS = {"male": "#2563eb", "female": "#be185d", "total": "#1a1a2e",
          "green": "#16a34a", "red": "#dc2626", "orange": "#f59e0b", "purple": "#7c3aed"}
plt.rcParams.update({"font.family": "serif", "font.size": 11,
                     "axes.spines.top": False, "axes.spines.right": False,
                     "figure.facecolor": "white"})

def save(fig, name):
    fig.savefig(os.path.join(OUTPUT, f"{name}.png"), dpi=150, bbox_inches="tight")
    plt.close(fig)
    print(f"  Saved: {name}.png")

# ============================================================
# 1. AGE DISTRIBUTION — Histogram + KDE
# ============================================================
fig, ax = plt.subplots(figsize=(10, 5))
ax.hist(df["age"], bins=50, color=COLORS["total"], alpha=0.7, edgecolor="white", density=True)
ax.set_title("Age Distribution of Survey Respondents", fontsize=14, fontweight="bold")
ax.set_xlabel("Age"); ax.set_ylabel("Density")
ax.axvline(df["age"].median(), color=COLORS["red"], ls="--", lw=2, label=f'Median: {df["age"].median():.0f}')
ax.legend()
save(fig, "01_age_distribution_hist")

# ============================================================
# 2. SEX DISTRIBUTION — Pie
# ============================================================
sex_counts = df["sex_label"].value_counts()
fig, ax = plt.subplots(figsize=(7, 7))
ax.pie(sex_counts, labels=sex_counts.index, autopct='%1.1f%%',
       colors=[COLORS["male"], COLORS["female"], COLORS["purple"]],
       startangle=90, wedgeprops=dict(width=0.45, edgecolor="white", linewidth=2))
ax.set_title("Gender Distribution", fontsize=14, fontweight="bold")
save(fig, "02_sex_distribution_donut")

# ============================================================
# 3. EDUCATION LEVEL — Bar
# ============================================================
edu_order = [1,2,3,4,5,6,7,8,10,11,12,13]
edu_counts = df["gedu_lvl"].value_counts().reindex(edu_order).fillna(0)
edu_labels = [EDU_MAP.get(e, str(e)) for e in edu_order]
fig, ax = plt.subplots(figsize=(12, 5))
ax.bar(edu_labels, edu_counts.values, color=plt.cm.viridis(np.linspace(0.2, 0.9, len(edu_order))),
       edgecolor="white")
ax.set_title("Education Level Distribution", fontsize=14, fontweight="bold")
ax.set_ylabel("Count")
plt.xticks(rotation=40, ha="right")
save(fig, "03_education_bar")

# ============================================================
# 4. LFPR by Gender — Grouped Bar
# ============================================================
lfpr_gender = df15.groupby("sex_label")["in_lf"].mean() * 100
fig, ax = plt.subplots(figsize=(8, 5))
bars = ax.bar(lfpr_gender.index, lfpr_gender.values,
              color=[COLORS["male"], COLORS["female"], COLORS["purple"]][:len(lfpr_gender)],
              width=0.5, edgecolor="white")
for b, v in zip(bars, lfpr_gender.values):
    ax.text(b.get_x() + b.get_width()/2, b.get_height() + 0.5, f'{v:.1f}%',
            ha='center', fontweight='bold')
ax.set_title("Labour Force Participation Rate by Gender", fontsize=14, fontweight="bold")
ax.set_ylabel("LFPR (%)")
save(fig, "04_lfpr_gender_bar")

# ============================================================
# 5. LFPR by Age Group — Line
# ============================================================
lfpr_age = df15.groupby("age_group")["in_lf"].mean() * 100
fig, ax = plt.subplots(figsize=(10, 5))
ax.plot(lfpr_age.index.astype(str), lfpr_age.values, "o-", color=COLORS["total"], lw=2.5)
ax.fill_between(range(len(lfpr_age)), lfpr_age.values, alpha=0.15, color=COLORS["total"])
ax.set_title("LFPR by Age Group", fontsize=14, fontweight="bold")
ax.set_ylabel("LFPR (%)")
ax.grid(axis="y", alpha=0.3)
save(fig, "05_lfpr_age_line")

# ============================================================
# 6. LFPR by Age + Gender — Multi-line
# ============================================================
fig, ax = plt.subplots(figsize=(10, 5))
for sex, color in [("Male", COLORS["male"]), ("Female", COLORS["female"])]:
    sub = df15[df15["sex_label"] == sex]
    lfpr = sub.groupby("age_group")["in_lf"].mean() * 100
    ax.plot(lfpr.index.astype(str), lfpr.values, "o-", color=color, lw=2.5, label=sex)
ax.set_title("LFPR by Age Group & Gender", fontsize=14, fontweight="bold")
ax.set_ylabel("LFPR (%)"); ax.legend(); ax.grid(axis="y", alpha=0.3)
save(fig, "06_lfpr_age_gender_line")

# ============================================================
# 7. UNEMPLOYMENT RATE by Gender — Bar
# ============================================================
ur_gender = df15.groupby("sex_label").apply(
    lambda x: x["unemployed"].sum() / x["in_lf"].sum() * 100 if x["in_lf"].sum() > 0 else 0)
fig, ax = plt.subplots(figsize=(8, 5))
bars = ax.bar(ur_gender.index, ur_gender.values,
              color=[COLORS["male"], COLORS["female"], COLORS["purple"]][:len(ur_gender)],
              width=0.5, edgecolor="white")
for b, v in zip(bars, ur_gender.values):
    ax.text(b.get_x() + b.get_width()/2, b.get_height() + 0.2, f'{v:.1f}%',
            ha='center', fontweight='bold')
ax.set_title("Unemployment Rate by Gender", fontsize=14, fontweight="bold")
ax.set_ylabel("UR (%)")
save(fig, "07_ur_gender_bar")

# ============================================================
# 8. UR by Age Group — Bar (color-coded)
# ============================================================
ur_age = df15.groupby("age_group").apply(
    lambda x: x["unemployed"].sum() / x["in_lf"].sum() * 100 if x["in_lf"].sum() > 0 else 0)
fig, ax = plt.subplots(figsize=(10, 5))
colors = [COLORS["red"] if v > 5 else COLORS["orange"] if v > 2 else COLORS["green"] for v in ur_age.values]
bars = ax.bar(ur_age.index.astype(str), ur_age.values, color=colors, width=0.6, edgecolor="white")
for b, v in zip(bars, ur_age.values):
    ax.text(b.get_x() + b.get_width()/2, b.get_height() + 0.2, f'{v:.1f}%',
            ha='center', fontsize=10, fontweight='bold')
ax.set_title("Unemployment Rate by Age Group", fontsize=14, fontweight="bold")
ax.set_ylabel("UR (%)")
save(fig, "08_ur_age_bar")

# ============================================================
# 9. UR by Education — Horizontal Bar
# ============================================================
ur_edu = df15.groupby("edu_label").apply(
    lambda x: x["unemployed"].sum() / x["in_lf"].sum() * 100 if x["in_lf"].sum() > 0 else 0
).sort_values()
fig, ax = plt.subplots(figsize=(10, 6))
colors = plt.cm.Reds(np.linspace(0.3, 0.9, len(ur_edu)))
ax.barh(ur_edu.index, ur_edu.values, color=colors, height=0.6)
ax.set_title("Unemployment Rate by Education Level", fontsize=14, fontweight="bold")
ax.set_xlabel("UR (%)")
for i, v in enumerate(ur_edu.values):
    ax.text(v + 0.2, i, f'{v:.1f}%', va='center', fontsize=10, fontweight='bold')
save(fig, "09_ur_education_hbar")

# ============================================================
# 10. EMPLOYMENT STATUS — Stacked Bar by Gender
# ============================================================
sas_gender = pd.crosstab(df15["sex_label"], df15["sas_label"], normalize="index") * 100
fig, ax = plt.subplots(figsize=(12, 6))
sas_gender.plot(kind="barh", stacked=True, ax=ax, colormap="tab10", edgecolor="white")
ax.set_title("Employment Status by Gender (Stacked)", fontsize=14, fontweight="bold")
ax.set_xlabel("Percentage (%)")
ax.legend(bbox_to_anchor=(1.02, 1), loc="upper left", fontsize=9)
save(fig, "10_employment_status_stacked")

# ============================================================
# 11. EARNINGS DISTRIBUTION — Histogram
# ============================================================
earnings = df15["total_earnings"].dropna()
earnings = earnings[earnings > 0]
fig, ax = plt.subplots(figsize=(10, 5))
ax.hist(earnings.clip(upper=earnings.quantile(0.95)), bins=50, color=COLORS["total"],
        alpha=0.7, edgecolor="white")
ax.axvline(earnings.median(), color=COLORS["red"], ls="--", lw=2,
           label=f'Median: Rs {earnings.median():,.0f}')
ax.axvline(earnings.mean(), color=COLORS["orange"], ls="--", lw=2,
           label=f'Mean: Rs {earnings.mean():,.0f}')
ax.set_title("Earnings Distribution (Clipped at 95th percentile)", fontsize=14, fontweight="bold")
ax.set_xlabel("Monthly Earnings (Rs)"); ax.set_ylabel("Frequency"); ax.legend()
save(fig, "11_earnings_histogram")

# ============================================================
# 12. EARNINGS by Gender — Box Plot
# ============================================================
fig, ax = plt.subplots(figsize=(8, 6))
data_m = earnings[df15.loc[earnings.index, "sex"] == 1].clip(upper=earnings.quantile(0.95))
data_f = earnings[df15.loc[earnings.index, "sex"] == 2].clip(upper=earnings.quantile(0.95))
bp = ax.boxplot([data_m, data_f], tick_labels=["Male", "Female"],
                patch_artist=True, showfliers=False)
bp["boxes"][0].set_facecolor(COLORS["male"]); bp["boxes"][0].set_alpha(0.6)
bp["boxes"][1].set_facecolor(COLORS["female"]); bp["boxes"][1].set_alpha(0.6)
ax.set_title("Earnings by Gender (Box Plot)", fontsize=14, fontweight="bold")
ax.set_ylabel("Monthly Earnings (Rs)")
save(fig, "12_earnings_gender_boxplot")

# ============================================================
# 13. STATE-WISE LFPR — Horizontal Bar
# ============================================================
state_lfpr = df15.groupby("state_label")["in_lf"].mean().sort_values() * 100
state_lfpr = state_lfpr.dropna()
fig, ax = plt.subplots(figsize=(10, max(8, len(state_lfpr) * 0.35)))
colors = [COLORS["red"] if v < 50 else COLORS["orange"] if v < 60 else COLORS["green"]
          for v in state_lfpr.values]
ax.barh(state_lfpr.index, state_lfpr.values, color=colors, height=0.7, edgecolor="white")
overall = df15["in_lf"].mean() * 100
ax.axvline(overall, color="black", ls="--", lw=1, alpha=0.5)
ax.set_title("State-wise LFPR", fontsize=14, fontweight="bold")
ax.set_xlabel("LFPR (%)")
save(fig, "13_state_lfpr_hbar")

# ============================================================
# 14. MARITAL STATUS vs LFPR — Grouped
# ============================================================
lfpr_marst = df15.groupby(["marst_label", "sex_label"])["in_lf"].mean() * 100
lfpr_marst = lfpr_marst.unstack()
fig, ax = plt.subplots(figsize=(10, 5))
lfpr_marst.plot(kind="bar", ax=ax, color=[COLORS["male"], COLORS["female"], COLORS["purple"]],
                edgecolor="white", width=0.7)
ax.set_title("LFPR by Marital Status & Gender", fontsize=14, fontweight="bold")
ax.set_ylabel("LFPR (%)"); plt.xticks(rotation=30, ha="right")
ax.legend(title="Gender")
save(fig, "14_lfpr_marital_gender")

# ============================================================
# 15. WORK HOURS DISTRIBUTION — Histogram
# ============================================================
hrs = df15["tothrs_wrk"]
hrs = hrs[hrs > 0]
fig, ax = plt.subplots(figsize=(10, 5))
ax.hist(hrs, bins=40, color=COLORS["purple"], alpha=0.7, edgecolor="white")
ax.axvline(hrs.median(), color=COLORS["red"], ls="--", lw=2, label=f'Median: {hrs.median():.0f} hrs')
ax.set_title("Weekly Work Hours Distribution", fontsize=14, fontweight="bold")
ax.set_xlabel("Hours per week"); ax.set_ylabel("Frequency"); ax.legend()
save(fig, "15_work_hours_histogram")

# ============================================================
# 16. HEATMAP — LFPR by State x Gender
# ============================================================
heatmap_data = df15.groupby(["state_label", "sex_label"])["in_lf"].mean().unstack() * 100
heatmap_data = heatmap_data.dropna().sort_values("Female", ascending=False).head(20)
fig, ax = plt.subplots(figsize=(8, 10))
im = ax.imshow(heatmap_data.values, cmap="YlOrRd", aspect="auto")
ax.set_xticks(range(heatmap_data.shape[1]))
ax.set_xticklabels(heatmap_data.columns)
ax.set_yticks(range(heatmap_data.shape[0]))
ax.set_yticklabels(heatmap_data.index)
for i in range(heatmap_data.shape[0]):
    for j in range(heatmap_data.shape[1]):
        ax.text(j, i, f'{heatmap_data.values[i,j]:.0f}%', ha='center', va='center',
                fontsize=9, color='white' if heatmap_data.values[i,j] > 50 else 'black')
plt.colorbar(im, ax=ax, shrink=0.5)
ax.set_title("LFPR Heatmap: State x Gender (Top 20)", fontsize=14, fontweight="bold")
save(fig, "16_state_gender_heatmap")

# ============================================================
# SUMMARY STATS
# ============================================================
print("\n" + "="*60)
print("PLFS EDA SUMMARY")
print("="*60)
print(f"Total records: {len(df):,}")
print(f"Working age (15+): {len(df15):,}")
print(f"\nOverall LFPR: {df15['in_lf'].mean()*100:.1f}%")
print(f"  Male LFPR: {df15[df15['sex']==1]['in_lf'].mean()*100:.1f}%")
print(f"  Female LFPR: {df15[df15['sex']==2]['in_lf'].mean()*100:.1f}%")
ur_total = df15['unemployed'].sum() / df15['in_lf'].sum() * 100
print(f"\nOverall UR: {ur_total:.1f}%")
print(f"  Male UR: {df15[df15['sex']==1]['unemployed'].sum() / df15[df15['sex']==1]['in_lf'].sum() * 100:.1f}%")
print(f"  Female UR: {df15[df15['sex']==2]['unemployed'].sum() / df15[df15['sex']==2]['in_lf'].sum() * 100:.1f}%")
print(f"\nMedian earnings: Rs {earnings.median():,.0f}")
print(f"Mean earnings: Rs {earnings.mean():,.0f}")
print(f"\nGraphs saved: {len(os.listdir(OUTPUT))}")
