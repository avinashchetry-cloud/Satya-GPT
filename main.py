import csv
import json

input_file = "bbc_news.csv"       # your CSV file
output_file = "bbc_news.json"     # output JSON file

with open(input_file, encoding="utf-8") as fin, open(output_file, "w", encoding="utf-8") as fout:
    reader = csv.DictReader(fin)
    for row in reader:
        json.dump(row, fout)
        fout.write("\n")          # one JSON object per line (MongoDB-friendly)
