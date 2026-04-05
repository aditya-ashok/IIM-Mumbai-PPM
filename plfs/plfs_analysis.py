"""
PLFS (Periodic Labour Force Survey) Data Analysis Framework
IIM Mumbai PPM - Assignment & Learning

Usage:
    1. Place your PLFS data file (CSV/Excel) in this directory
    2. Update DATA_FILE path below
    3. Run: python plfs_analysis.py

Dependencies: pip install numpy pandas matplotlib openpyxl
"""

import numpy as np
import pandas as pd
import os

# ============================================================
# CONFIGURATION — Update this with your PLFS data file path
# ============================================================
DATA_FILE = None  # e.g., "PLFS_2023-24.csv" or "PLFS_data.xlsx"

# ============================================================
# DATA LOADING
# ============================================================
def load_data(filepath):
    """Load PLFS data from CSV or Excel."""
    if filepath is None:
        print("=" * 60)
        print("PLFS Analysis Framework Ready!")
        print("=" * 60)
        print("\nWaiting for data file. Set DATA_FILE in this script")
        print("or call load_data('your_file.csv') directly.\n")
        print("Supported formats: .csv, .xlsx, .xls")
        print("=" * 60)
        return None

    ext = os.path.splitext(filepath)[1].lower()
    if ext == ".csv":
        df = pd.read_csv(filepath)
    elif ext in (".xlsx", ".xls"):
        df = pd.read_excel(filepath)
    else:
        raise ValueError(f"Unsupported format: {ext}. Use .csv or .xlsx")

    print(f"Loaded: {filepath}")
    print(f"Shape: {df.shape[0]} rows x {df.shape[1]} columns\n")
    return df


# ============================================================
# 1. BASIC OVERVIEW
# ============================================================
def overview(df):
    """Basic dataset overview."""
    print("=" * 60)
    print("DATASET OVERVIEW")
    print("=" * 60)
    print(f"\nRows: {df.shape[0]:,}")
    print(f"Columns: {df.shape[1]}")
    print(f"\nColumn Names:\n{list(df.columns)}")
    print(f"\nData Types:\n{df.dtypes}")
    print(f"\nMissing Values:\n{df.isnull().sum()}")
    print(f"\nFirst 5 Rows:\n{df.head()}")
    return df.describe()


# ============================================================
# 2. EMPLOYMENT & UNEMPLOYMENT ANALYSIS
# ============================================================
def employment_analysis(df, status_col=None, age_col=None, gender_col=None):
    """
    Analyze employment/unemployment rates.
    Adjust column names based on your PLFS dataset.
    """
    print("=" * 60)
    print("EMPLOYMENT & UNEMPLOYMENT ANALYSIS")
    print("=" * 60)

    if status_col and status_col in df.columns:
        print(f"\nEmployment Status Distribution:")
        status_dist = df[status_col].value_counts(normalize=True) * 100
        print(status_dist.round(2))

        if gender_col and gender_col in df.columns:
            print(f"\nEmployment by Gender:")
            cross = pd.crosstab(df[gender_col], df[status_col], normalize="index") * 100
            print(cross.round(2))

        if age_col and age_col in df.columns:
            print(f"\nEmployment by Age Group:")
            df["age_group"] = pd.cut(df[age_col], bins=[0, 18, 25, 35, 45, 55, 65, 100],
                                     labels=["0-18", "18-25", "25-35", "35-45", "45-55", "55-65", "65+"])
            cross_age = pd.crosstab(df["age_group"], df[status_col], normalize="index") * 100
            print(cross_age.round(2))
    else:
        print("\nSpecify status_col parameter matching your dataset.")
        print(f"Available columns: {list(df.columns)}")


# ============================================================
# 3. LABOUR FORCE PARTICIPATION RATE (LFPR)
# ============================================================
def lfpr_analysis(df, labour_force_col=None, population_col=None,
                  sector_col=None, gender_col=None, state_col=None):
    """
    Calculate LFPR = (Labour Force / Working Age Population) x 100
    """
    print("=" * 60)
    print("LABOUR FORCE PARTICIPATION RATE (LFPR)")
    print("=" * 60)

    if labour_force_col and labour_force_col in df.columns:
        total_lf = df[labour_force_col].sum()
        total_pop = len(df) if population_col is None else df[population_col].sum()
        lfpr = (total_lf / total_pop) * 100
        print(f"\nOverall LFPR: {lfpr:.2f}%")

        if gender_col and gender_col in df.columns:
            print(f"\nLFPR by Gender:")
            for g in df[gender_col].unique():
                subset = df[df[gender_col] == g]
                g_lfpr = (subset[labour_force_col].sum() / len(subset)) * 100
                print(f"  {g}: {g_lfpr:.2f}%")

        if sector_col and sector_col in df.columns:
            print(f"\nLFPR by Sector (Rural/Urban):")
            for s in df[sector_col].unique():
                subset = df[df[sector_col] == s]
                s_lfpr = (subset[labour_force_col].sum() / len(subset)) * 100
                print(f"  {s}: {s_lfpr:.2f}%")

        if state_col and state_col in df.columns:
            print(f"\nLFPR by State (Top 10):")
            state_lfpr = df.groupby(state_col).apply(
                lambda x: (x[labour_force_col].sum() / len(x)) * 100
            ).sort_values(ascending=False)
            print(state_lfpr.head(10).round(2))
    else:
        print("\nSpecify labour_force_col matching your dataset.")
        print(f"Available columns: {list(df.columns)}")


# ============================================================
# 4. WORKER POPULATION RATIO (WPR)
# ============================================================
def wpr_analysis(df, employed_col=None, gender_col=None, sector_col=None):
    """
    Calculate WPR = (Employed / Working Age Population) x 100
    """
    print("=" * 60)
    print("WORKER POPULATION RATIO (WPR)")
    print("=" * 60)

    if employed_col and employed_col in df.columns:
        wpr = (df[employed_col].sum() / len(df)) * 100
        print(f"\nOverall WPR: {wpr:.2f}%")

        if gender_col and gender_col in df.columns:
            print(f"\nWPR by Gender:")
            for g in df[gender_col].unique():
                subset = df[df[gender_col] == g]
                g_wpr = (subset[employed_col].sum() / len(subset)) * 100
                print(f"  {g}: {g_wpr:.2f}%")
    else:
        print("\nSpecify employed_col matching your dataset.")


# ============================================================
# 5. UNEMPLOYMENT RATE
# ============================================================
def unemployment_rate(df, unemployed_col=None, labour_force_col=None,
                      gender_col=None, age_col=None, education_col=None):
    """
    UR = (Unemployed / Labour Force) x 100
    """
    print("=" * 60)
    print("UNEMPLOYMENT RATE")
    print("=" * 60)

    if unemployed_col and labour_force_col:
        if unemployed_col in df.columns and labour_force_col in df.columns:
            ur = (df[unemployed_col].sum() / df[labour_force_col].sum()) * 100
            print(f"\nOverall Unemployment Rate: {ur:.2f}%")

            if gender_col and gender_col in df.columns:
                print(f"\nUR by Gender:")
                for g in df[gender_col].unique():
                    s = df[df[gender_col] == g]
                    g_ur = (s[unemployed_col].sum() / s[labour_force_col].sum()) * 100
                    print(f"  {g}: {g_ur:.2f}%")

            if education_col and education_col in df.columns:
                print(f"\nUR by Education:")
                for e in df[education_col].unique():
                    s = df[df[education_col] == e]
                    if s[labour_force_col].sum() > 0:
                        e_ur = (s[unemployed_col].sum() / s[labour_force_col].sum()) * 100
                        print(f"  {e}: {e_ur:.2f}%")
    else:
        print("\nSpecify unemployed_col and labour_force_col.")


# ============================================================
# 6. SECTORAL DISTRIBUTION
# ============================================================
def sectoral_analysis(df, industry_col=None, weight_col=None):
    """Analyze distribution across sectors/industries."""
    print("=" * 60)
    print("SECTORAL DISTRIBUTION")
    print("=" * 60)

    if industry_col and industry_col in df.columns:
        if weight_col and weight_col in df.columns:
            sector_dist = df.groupby(industry_col)[weight_col].sum()
            sector_pct = (sector_dist / sector_dist.sum() * 100).sort_values(ascending=False)
        else:
            sector_pct = df[industry_col].value_counts(normalize=True) * 100

        print(f"\nSector Distribution (%):")
        print(sector_pct.round(2))
    else:
        print("\nSpecify industry_col matching your dataset.")


# ============================================================
# 7. WAGE ANALYSIS
# ============================================================
def wage_analysis(df, wage_col=None, gender_col=None, sector_col=None,
                  education_col=None, state_col=None):
    """Analyze wage distribution and gaps."""
    print("=" * 60)
    print("WAGE ANALYSIS")
    print("=" * 60)

    if wage_col and wage_col in df.columns:
        wages = df[wage_col].dropna()
        print(f"\nWage Statistics:")
        print(f"  Mean:   Rs {wages.mean():,.0f}")
        print(f"  Median: Rs {wages.median():,.0f}")
        print(f"  Std:    Rs {wages.std():,.0f}")
        print(f"  Min:    Rs {wages.min():,.0f}")
        print(f"  Max:    Rs {wages.max():,.0f}")

        percentiles = np.percentile(wages, [10, 25, 50, 75, 90])
        print(f"\n  P10: Rs {percentiles[0]:,.0f}")
        print(f"  P25: Rs {percentiles[1]:,.0f}")
        print(f"  P50: Rs {percentiles[2]:,.0f}")
        print(f"  P75: Rs {percentiles[3]:,.0f}")
        print(f"  P90: Rs {percentiles[4]:,.0f}")

        if gender_col and gender_col in df.columns:
            print(f"\nWage by Gender:")
            gender_wage = df.groupby(gender_col)[wage_col].agg(["mean", "median", "count"])
            print(gender_wage.round(0))
            genders = df[gender_col].unique()
            if len(genders) == 2:
                w1 = df[df[gender_col] == genders[0]][wage_col].median()
                w2 = df[df[gender_col] == genders[1]][wage_col].median()
                gap = abs(w1 - w2) / max(w1, w2) * 100
                print(f"\n  Gender Wage Gap (median): {gap:.1f}%")

        if sector_col and sector_col in df.columns:
            print(f"\nWage by Sector:")
            print(df.groupby(sector_col)[wage_col].agg(["mean", "median", "count"]).round(0))
    else:
        print("\nSpecify wage_col matching your dataset.")


# ============================================================
# 8. SUMMARY REPORT
# ============================================================
def generate_summary(df):
    """Generate a text summary of the dataset."""
    print("=" * 60)
    print("PLFS DATA SUMMARY REPORT")
    print("=" * 60)
    print(f"\nDataset: {df.shape[0]:,} records, {df.shape[1]} variables")
    print(f"\nNumeric Columns: {list(df.select_dtypes(include=[np.number]).columns)}")
    print(f"Categorical Columns: {list(df.select_dtypes(include=['object', 'category']).columns)}")
    print(f"\nMissing Data Summary:")
    missing = df.isnull().sum()
    missing_pct = (missing / len(df) * 100).round(2)
    missing_df = pd.DataFrame({"Count": missing, "Percent": missing_pct})
    print(missing_df[missing_df["Count"] > 0])
    print(f"\nDescriptive Statistics:")
    print(df.describe().round(2))


# ============================================================
# MAIN
# ============================================================
if __name__ == "__main__":
    df = load_data(DATA_FILE)

    if df is not None:
        overview(df)
        generate_summary(df)

        # Uncomment and customize with your column names:
        # employment_analysis(df, status_col="employment_status", gender_col="sex")
        # lfpr_analysis(df, labour_force_col="in_labour_force", gender_col="sex", sector_col="sector")
        # wpr_analysis(df, employed_col="employed", gender_col="sex")
        # unemployment_rate(df, unemployed_col="unemployed", labour_force_col="in_labour_force")
        # sectoral_analysis(df, industry_col="industry_section")
        # wage_analysis(df, wage_col="earnings", gender_col="sex", sector_col="sector")
