# CrowdSafe 🚨

**CrowdSafe** is a data-driven crime severity assessment tool designed to help individuals understand the safety level of their local area based on historical crime reports. By analyzing and rating crime offense descriptions using a keyword-based severity dictionary, CrowdSafe provides a simplified overview of how serious or frequent different criminal offenses are in specific areas.

## 🔍 Features

- 📊 Converts raw offense descriptions into numeric severity scores.
- 🧠 Uses a dictionary-based approach to match keywords with severity levels.
- 🗺️ Enables local area crime mapping and heatmaps.
- 📈 Helps visualize patterns and hotspots for crime using severity rankings.
- 🧹 Cleans and standardizes offense data for better analysis.

## 🛠️ Tech Stack

- Python 🐍 (Pandas, Regex)
- Keyword-based NLP (No external ML model required)
- Jupyter / Colab friendly notebook format

## 🚦 Severity Scoring

Severity is rated on a scale from 0 (unknown/minor) to 100 (very severe). The rating is based on the presence of certain keywords in the offense descriptions, such as:

- `MURDER`, `RAPE`, `TERRORISTIC THREAT` → Score: 90–100
- `ASSAULT`, `ROBBERY`, `FIREARM` → Score: 70–90
- `LARCENY`, `FRAUD`, `DRUG` → Score: 50–70
- `TRESPASS`, `DISORDERLY CONDUCT` → Score: 20–40
- `UNLICENSED`, `NOISE`, `CELL PHONE` → Score: 10–20

## 📂 How It Works

1. Import the offense description dataset.
2. Clean and standardize the text.
3. Match words or phrases against a pre-defined severity keyword dictionary.
4. Assign scores based on keyword relevance and numeric indicators (like "1st degree", "3rd", etc).
5. Display the results in a DataFrame or export for visualization.

## 🧠 Example Output

| PD_DESC                      | SEVERITY |
|-----------------------------|----------|
| STRANGULATION 1ST           | 95       |
| RAPE 3                      | 90       |
| BURGLARY,UNCLASSIFIED       | 75       |
| DISORDERLY CONDUCT          | 25       |
| UNKNOWN                     | 0        |

## 📍 Use Cases

- Public safety dashboards
- Crime heatmap visualizations
- Community awareness apps
- Urban planning and security assessments


Feel free to contribute or suggest features to improve CrowdSafe!
