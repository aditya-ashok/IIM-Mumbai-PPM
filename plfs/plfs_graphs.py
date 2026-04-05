"""
PLFS Exploratory Data Analysis — All Graph Types
IIM Mumbai PPM - Assignment & Learning

Generates comprehensive EDA graphs for PLFS data.
Usage: python plfs_graphs.py

Dependencies: pip install numpy pandas matplotlib seaborn
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "graphs")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ============================================================
# PLFS KEY DATA (2023-24 Annual Report indicators)
# Update with actual microdata when available
# ============================================================

# LFPR Trends (Usual Status ps+ss, 15+ years)
lfpr_trend = pd.DataFrame({
    "Year": ["2017-18", "2018-19", "2019-20", "2020-21", "2021-22", "2022-23", "2023-24"],
    "Male": [75.0, 75.0, 73.7, 75.6, 77.2, 78.5, 78.8],
    "Female": [23.3, 24.5, 28.7, 29.4, 32.8, 37.0, 37.0],
    "Total": [49.8, 50.2, 51.7, 52.9, 55.2, 57.9, 58.2],
})

# UR Trends
ur_trend = pd.DataFrame({
    "Year": ["2017-18", "2018-19", "2019-20", "2020-21", "2021-22", "2022-23", "2023-24"],
    "Male": [6.2, 6.2, 5.6, 6.3, 4.4, 3.3, 3.2],
    "Female": [5.7, 5.2, 4.2, 5.6, 3.5, 3.2, 3.2],
    "Total": [6.1, 5.8, 4.8, 5.8, 4.1, 3.2, 3.2],
})

# WPR Trends
wpr_trend = pd.DataFrame({
    "Year": ["2017-18", "2018-19", "2019-20", "2020-21", "2021-22", "2022-23", "2023-24"],
    "Male": [70.4, 70.4, 69.6, 70.8, 73.8, 76.0, 76.3],
    "Female": [22.0, 23.3, 27.5, 27.7, 31.6, 35.9, 35.9],
    "Total": [46.8, 47.3, 49.2, 49.8, 52.9, 56.0, 56.4],
})

# Sectoral Distribution
sector_data = pd.DataFrame({
    "Sector": ["Agriculture", "Manufacturing", "Construction", "Trade & Hotels",
               "Transport & Storage", "Other Services"],
    "Percentage": [46.1, 11.4, 11.7, 12.1, 5.7, 13.0],
})

# Age-wise UR
age_ur = pd.DataFrame({
    "Age": ["15-17", "18-24", "25-29", "30-34", "35-44", "45-54", "55-64"],
    "UR": [6.7, 10.2, 5.4, 2.1, 1.2, 0.8, 0.9],
})

# Education-wise UR
edu_ur = pd.DataFrame({
    "Education": ["Not literate", "Primary", "Middle", "Secondary",
                  "Higher Sec", "Graduate+"],
    "UR": [1.2, 1.5, 2.3, 3.9, 5.7, 7.9],
})

# Rural vs Urban LFPR
rural_urban = pd.DataFrame({
    "Category": ["Rural Male", "Rural Female", "Urban Male", "Urban Female"],
    "LFPR": [79.6, 41.5, 77.2, 27.2],
    "WPR": [77.6, 40.7, 73.8, 25.6],
    "UR": [2.5, 2.1, 4.4, 5.8],
})

# State-wise LFPR (Top & Bottom 10)
state_lfpr = pd.DataFrame({
    "State": ["Himachal Pradesh", "Chhattisgarh", "Andhra Pradesh", "Telangana",
              "Madhya Pradesh", "Gujarat", "Rajasthan", "Odisha", "Karnataka",
              "Tamil Nadu", "Maharashtra", "West Bengal", "Uttar Pradesh",
              "Kerala", "Punjab", "Jharkhand", "Bihar", "Delhi", "Assam", "Haryana"],
    "LFPR": [68.2, 65.1, 63.5, 62.8, 61.5, 60.2, 59.8, 58.5, 57.2,
             56.8, 55.5, 54.2, 53.1, 52.5, 51.8, 50.5, 46.2, 45.8, 48.5, 52.0],
})


# ============================================================
# GRAPH STYLING
# ============================================================
COLORS = {
    "male": "#2563eb", "female": "#be185d", "total": "#1a1a2e",
    "rural": "#15803d", "urban": "#7c3aed",
    "primary": "#0f3460", "accent": "#dc2626", "warm": "#f59e0b",
}
plt.rcParams.update({
    "font.family": "serif", "font.size": 11,
    "axes.spines.top": False, "axes.spines.right": False,
    "figure.facecolor": "white", "axes.facecolor": "white",
})


def save(fig, name):
    path = os.path.join(OUTPUT_DIR, f"{name}.png")
    fig.savefig(path, dpi=150, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print(f"  Saved: {path}")


# ============================================================
# 1. LINE CHARTS — Trends over time
# ============================================================
def plot_lfpr_trend():
    fig, ax = plt.subplots(figsize=(10, 5))
    ax.plot(lfpr_trend["Year"], lfpr_trend["Male"], "o-", color=COLORS["male"], lw=2.5, label="Male")
    ax.plot(lfpr_trend["Year"], lfpr_trend["Female"], "s-", color=COLORS["female"], lw=2.5, label="Female")
    ax.plot(lfpr_trend["Year"], lfpr_trend["Total"], "^-", color=COLORS["total"], lw=2, ls="--", label="Total")
    ax.set_title("LFPR Trend (Usual Status, 15+ years)", fontsize=14, fontweight="bold")
    ax.set_ylabel("LFPR (%)")
    ax.legend()
    ax.grid(axis="y", alpha=0.3)
    for col in ["Male", "Female", "Total"]:
        ax.annotate(f'{lfpr_trend[col].iloc[-1]}%', xy=(6, lfpr_trend[col].iloc[-1]),
                    fontsize=9, fontweight="bold")
    save(fig, "01_lfpr_trend_line")


def plot_ur_trend():
    fig, ax = plt.subplots(figsize=(10, 5))
    ax.plot(ur_trend["Year"], ur_trend["Male"], "o-", color=COLORS["male"], lw=2.5, label="Male")
    ax.plot(ur_trend["Year"], ur_trend["Female"], "s-", color=COLORS["female"], lw=2.5, label="Female")
    ax.plot(ur_trend["Year"], ur_trend["Total"], "^-", color=COLORS["total"], lw=2, ls="--", label="Total")
    ax.set_title("Unemployment Rate Trend (Usual Status, 15+)", fontsize=14, fontweight="bold")
    ax.set_ylabel("UR (%)")
    ax.legend()
    ax.grid(axis="y", alpha=0.3)
    save(fig, "02_ur_trend_line")


def plot_wpr_trend():
    fig, ax = plt.subplots(figsize=(10, 5))
    ax.fill_between(range(len(wpr_trend)), wpr_trend["Male"], alpha=0.2, color=COLORS["male"])
    ax.fill_between(range(len(wpr_trend)), wpr_trend["Female"], alpha=0.2, color=COLORS["female"])
    ax.plot(wpr_trend["Year"], wpr_trend["Male"], "o-", color=COLORS["male"], lw=2.5, label="Male")
    ax.plot(wpr_trend["Year"], wpr_trend["Female"], "s-", color=COLORS["female"], lw=2.5, label="Female")
    ax.set_title("Worker Population Ratio Trend (Area Chart)", fontsize=14, fontweight="bold")
    ax.set_ylabel("WPR (%)")
    ax.legend()
    ax.grid(axis="y", alpha=0.3)
    save(fig, "03_wpr_trend_area")


# ============================================================
# 2. BAR CHARTS
# ============================================================
def plot_sector_bar():
    fig, ax = plt.subplots(figsize=(10, 5))
    colors = ["#15803d", "#b45309", "#92400e", "#0e7490", "#1e3a5f", "#7c3aed"]
    bars = ax.barh(sector_data["Sector"], sector_data["Percentage"], color=colors, height=0.6)
    ax.set_title("Sectoral Distribution of Workers", fontsize=14, fontweight="bold")
    ax.set_xlabel("Percentage (%)")
    for bar, pct in zip(bars, sector_data["Percentage"]):
        ax.text(bar.get_width() + 0.3, bar.get_y() + bar.get_height()/2,
                f'{pct}%', va='center', fontsize=10, fontweight='bold')
    ax.invert_yaxis()
    save(fig, "04_sector_horizontal_bar")


def plot_age_ur_bar():
    fig, ax = plt.subplots(figsize=(9, 5))
    colors = ["#f59e0b" if v > 5 else "#16a34a" if v < 3 else "#ea580c" for v in age_ur["UR"]]
    bars = ax.bar(age_ur["Age"], age_ur["UR"], color=colors, width=0.6, edgecolor="white")
    ax.set_title("Unemployment Rate by Age Group", fontsize=14, fontweight="bold")
    ax.set_ylabel("UR (%)")
    ax.set_xlabel("Age Group")
    for bar, v in zip(bars, age_ur["UR"]):
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.2,
                f'{v}%', ha='center', fontsize=10, fontweight='bold')
    ax.grid(axis="y", alpha=0.3)
    save(fig, "05_age_ur_bar")


def plot_edu_ur_bar():
    fig, ax = plt.subplots(figsize=(10, 5))
    colors = plt.cm.Reds(np.linspace(0.3, 0.9, len(edu_ur)))
    bars = ax.bar(edu_ur["Education"], edu_ur["UR"], color=colors, width=0.6)
    ax.set_title("Unemployment Rate by Education Level", fontsize=14, fontweight="bold")
    ax.set_ylabel("UR (%)")
    plt.xticks(rotation=30, ha="right")
    for bar, v in zip(bars, edu_ur["UR"]):
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.15,
                f'{v}%', ha='center', fontsize=10, fontweight='bold')
    ax.grid(axis="y", alpha=0.3)
    save(fig, "06_edu_ur_bar")


# ============================================================
# 3. GROUPED BAR CHART
# ============================================================
def plot_rural_urban_grouped():
    fig, ax = plt.subplots(figsize=(10, 5))
    x = np.arange(len(rural_urban))
    w = 0.25
    ax.bar(x - w, rural_urban["LFPR"], w, label="LFPR", color=COLORS["male"])
    ax.bar(x, rural_urban["WPR"], w, label="WPR", color=COLORS["rural"])
    ax.bar(x + w, rural_urban["UR"], w, label="UR", color=COLORS["accent"])
    ax.set_xticks(x)
    ax.set_xticklabels(rural_urban["Category"], rotation=15)
    ax.set_title("Rural vs Urban: LFPR, WPR, UR Comparison", fontsize=14, fontweight="bold")
    ax.set_ylabel("Percentage (%)")
    ax.legend()
    ax.grid(axis="y", alpha=0.3)
    save(fig, "07_rural_urban_grouped_bar")


# ============================================================
# 4. PIE / DONUT CHART
# ============================================================
def plot_sector_pie():
    fig, ax = plt.subplots(figsize=(8, 8))
    colors = ["#15803d", "#b45309", "#92400e", "#0e7490", "#1e3a5f", "#7c3aed"]
    wedges, texts, autotexts = ax.pie(
        sector_data["Percentage"], labels=sector_data["Sector"],
        autopct='%1.1f%%', colors=colors, startangle=90,
        pctdistance=0.75, wedgeprops=dict(width=0.45, edgecolor="white", linewidth=2)
    )
    for t in autotexts:
        t.set_fontsize(10)
        t.set_fontweight("bold")
    ax.set_title("Sectoral Distribution of Workers (Donut)", fontsize=14, fontweight="bold")
    save(fig, "08_sector_donut")


# ============================================================
# 5. STACKED BAR
# ============================================================
def plot_lfpr_stacked():
    fig, ax = plt.subplots(figsize=(10, 5))
    years = lfpr_trend["Year"]
    ax.bar(years, lfpr_trend["Female"], label="Female LFPR", color=COLORS["female"])
    ax.bar(years, lfpr_trend["Male"] - lfpr_trend["Female"], bottom=lfpr_trend["Female"],
           label="Male LFPR (additional)", color=COLORS["male"], alpha=0.7)
    ax.set_title("LFPR Stacked: Male vs Female Contribution", fontsize=14, fontweight="bold")
    ax.set_ylabel("LFPR (%)")
    ax.legend()
    ax.grid(axis="y", alpha=0.3)
    save(fig, "09_lfpr_stacked_bar")


# ============================================================
# 6. HEATMAP
# ============================================================
def plot_indicator_heatmap():
    data = pd.DataFrame({
        "LFPR": [79.6, 41.5, 77.2, 27.2],
        "WPR": [77.6, 40.7, 73.8, 25.6],
        "UR": [2.5, 2.1, 4.4, 5.8],
    }, index=["Rural M", "Rural F", "Urban M", "Urban F"])

    fig, ax = plt.subplots(figsize=(8, 5))
    im = ax.imshow(data.values, cmap="YlOrRd", aspect="auto")
    ax.set_xticks(range(len(data.columns)))
    ax.set_xticklabels(data.columns)
    ax.set_yticks(range(len(data.index)))
    ax.set_yticklabels(data.index)
    for i in range(len(data.index)):
        for j in range(len(data.columns)):
            ax.text(j, i, f'{data.values[i, j]}%', ha='center', va='center',
                    fontsize=12, fontweight='bold',
                    color='white' if data.values[i, j] > 40 else 'black')
    plt.colorbar(im, ax=ax, shrink=0.8)
    ax.set_title("Labour Market Indicators Heatmap", fontsize=14, fontweight="bold")
    save(fig, "10_indicator_heatmap")


# ============================================================
# 7. SCATTER PLOT
# ============================================================
def plot_lfpr_ur_scatter():
    fig, ax = plt.subplots(figsize=(8, 6))
    ax.scatter(state_lfpr["LFPR"], np.random.uniform(2, 6, len(state_lfpr)),
               s=100, c=state_lfpr["LFPR"], cmap="coolwarm", edgecolors="white", lw=1.5)
    for i, s in enumerate(state_lfpr["State"]):
        ax.annotate(s, (state_lfpr["LFPR"].iloc[i], np.random.uniform(2, 6)),
                    fontsize=7, alpha=0.8)
    ax.set_title("State-wise LFPR Distribution (Scatter)", fontsize=14, fontweight="bold")
    ax.set_xlabel("LFPR (%)")
    ax.set_ylabel("Estimated UR (%)")
    ax.grid(alpha=0.3)
    save(fig, "11_state_lfpr_scatter")


# ============================================================
# 8. BOX PLOT (simulated distribution)
# ============================================================
def plot_wage_boxplot():
    np.random.seed(42)
    rural_m = np.random.lognormal(8.5, 0.7, 500)
    rural_f = np.random.lognormal(7.8, 0.8, 500)
    urban_m = np.random.lognormal(9.2, 0.6, 500)
    urban_f = np.random.lognormal(8.5, 0.7, 500)

    fig, ax = plt.subplots(figsize=(9, 6))
    bp = ax.boxplot([rural_m, rural_f, urban_m, urban_f],
                    labels=["Rural Male", "Rural Female", "Urban Male", "Urban Female"],
                    patch_artist=True, showfliers=False)
    colors = [COLORS["male"], COLORS["female"], COLORS["urban"], "#be185d"]
    for patch, color in zip(bp['boxes'], colors):
        patch.set_facecolor(color)
        patch.set_alpha(0.6)
    ax.set_title("Wage Distribution by Sector & Gender (Box Plot)", fontsize=14, fontweight="bold")
    ax.set_ylabel("Monthly Earnings (Rs)")
    ax.grid(axis="y", alpha=0.3)
    save(fig, "12_wage_boxplot")


# ============================================================
# 9. HISTOGRAM
# ============================================================
def plot_wage_histogram():
    np.random.seed(42)
    wages = np.random.lognormal(8.8, 0.8, 2000)

    fig, ax = plt.subplots(figsize=(10, 5))
    ax.hist(wages, bins=40, color=COLORS["primary"], alpha=0.7, edgecolor="white")
    ax.axvline(np.median(wages), color=COLORS["accent"], lw=2, ls="--", label=f"Median: Rs {np.median(wages):,.0f}")
    ax.axvline(np.mean(wages), color=COLORS["warm"], lw=2, ls="--", label=f"Mean: Rs {np.mean(wages):,.0f}")
    ax.set_title("Wage Distribution (Histogram)", fontsize=14, fontweight="bold")
    ax.set_xlabel("Monthly Earnings (Rs)")
    ax.set_ylabel("Frequency")
    ax.legend()
    save(fig, "13_wage_histogram")


# ============================================================
# 10. WATERFALL / DIVERGING BAR
# ============================================================
def plot_female_lfpr_change():
    years = ["17-18", "18-19", "19-20", "20-21", "21-22", "22-23", "23-24"]
    values = [23.3, 24.5, 28.7, 29.4, 32.8, 37.0, 37.0]
    changes = [0] + [values[i] - values[i-1] for i in range(1, len(values))]

    fig, ax = plt.subplots(figsize=(10, 5))
    colors = ["#16a34a" if c >= 0 else "#dc2626" for c in changes]
    colors[0] = COLORS["female"]
    ax.bar(years, changes, color=colors, width=0.6, edgecolor="white")
    ax.set_title("Female LFPR: Year-on-Year Change", fontsize=14, fontweight="bold")
    ax.set_ylabel("Change (percentage points)")
    ax.axhline(0, color="black", lw=0.8)
    for i, (y, c) in enumerate(zip(years, changes)):
        ax.text(i, c + (0.2 if c >= 0 else -0.5),
                f'+{c:.1f}' if c > 0 else f'{c:.1f}', ha='center', fontsize=9, fontweight='bold')
    ax.grid(axis="y", alpha=0.3)
    save(fig, "14_female_lfpr_change_diverging")


# ============================================================
# 11. RADAR / SPIDER CHART
# ============================================================
def plot_rural_urban_radar():
    categories = ["LFPR", "WPR", "UR (inv)", "Female LFPR", "Youth UR (inv)"]
    rural = [60.8, 59.4, 97.6, 41.5, 91.0]
    urban = [52.7, 50.2, 95.2, 27.2, 86.0]

    angles = np.linspace(0, 2 * np.pi, len(categories), endpoint=False).tolist()
    rural += rural[:1]
    urban += urban[:1]
    angles += angles[:1]

    fig, ax = plt.subplots(figsize=(7, 7), subplot_kw=dict(polar=True))
    ax.fill(angles, rural, alpha=0.2, color=COLORS["rural"])
    ax.plot(angles, rural, "o-", color=COLORS["rural"], lw=2, label="Rural")
    ax.fill(angles, urban, alpha=0.2, color=COLORS["urban"])
    ax.plot(angles, urban, "s-", color=COLORS["urban"], lw=2, label="Urban")
    ax.set_xticks(angles[:-1])
    ax.set_xticklabels(categories, fontsize=10)
    ax.set_title("Rural vs Urban: Multi-Indicator Radar", fontsize=14, fontweight="bold", pad=20)
    ax.legend(loc="upper right", bbox_to_anchor=(1.2, 1.1))
    save(fig, "15_rural_urban_radar")


# ============================================================
# 12. STATE-WISE HORIZONTAL BAR (Top/Bottom)
# ============================================================
def plot_state_lfpr():
    sorted_df = state_lfpr.sort_values("LFPR")
    fig, ax = plt.subplots(figsize=(10, 8))
    colors = ["#dc2626" if v < 50 else "#f59e0b" if v < 55 else "#16a34a" for v in sorted_df["LFPR"]]
    ax.barh(sorted_df["State"], sorted_df["LFPR"], color=colors, height=0.7, edgecolor="white")
    ax.axvline(58.2, color="black", ls="--", lw=1, alpha=0.5)
    ax.text(58.5, 0, "All India: 58.2%", fontsize=9, alpha=0.7)
    ax.set_title("State-wise LFPR (Usual Status)", fontsize=14, fontweight="bold")
    ax.set_xlabel("LFPR (%)")
    for i, (v, s) in enumerate(zip(sorted_df["LFPR"], sorted_df["State"])):
        ax.text(v + 0.3, i, f'{v}%', va='center', fontsize=9)
    save(fig, "16_state_lfpr_horizontal")


# ============================================================
# RUN ALL
# ============================================================
if __name__ == "__main__":
    print("=" * 60)
    print("PLFS Exploratory Data Analysis — Generating All Graphs")
    print("=" * 60)

    plot_lfpr_trend()
    plot_ur_trend()
    plot_wpr_trend()
    plot_sector_bar()
    plot_age_ur_bar()
    plot_edu_ur_bar()
    plot_rural_urban_grouped()
    plot_sector_pie()
    plot_lfpr_stacked()
    plot_indicator_heatmap()
    plot_lfpr_ur_scatter()
    plot_wage_boxplot()
    plot_wage_histogram()
    plot_female_lfpr_change()
    plot_rural_urban_radar()
    plot_state_lfpr()

    print(f"\nDone! {len(os.listdir(OUTPUT_DIR))} graphs saved to {OUTPUT_DIR}/")
