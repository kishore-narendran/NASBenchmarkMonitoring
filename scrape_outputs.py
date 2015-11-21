import os
import json
def scrape_file(filename):
    with open ("Output-Kishorex64/" + filename, "r") as myfile:
        data=myfile.read()

    if(data.find("Completed") == -1):
        return {}

    results = data[data.find("Completed") + 11 : data.find("Compile")].split("\n")
    results = [ result.replace(" ", "") for result in results ]
    #cpu_usage = data[data.find(".gov") + 4 : ].split(",")
    #cpu_usage = [ usage.replace("\n", "") for usage in cpu_usage ]
    #cpu_usage = [ float(usage) for usage in cpu_usage ]
    benchmark_result = {};
    benchmark_result["class"] = results[0][ results[0].find("=") + 1 : ]
    benchmark_result["size"] = results[1][ results[1].find("=") + 1 : ]
    benchmark_result["iterations"] = int(results[2][ results[2].find("=") + 1 : ])
    benchmark_result["time"] = float(results[3][ results[3].find("=") + 1 : ])
    benchmark_result["total_threads"] = int(results[4][ results[4].find("=") + 1 : ])
    benchmark_result["available_threads"] = int(results[5][ results[5].find("=") + 1 : ])
    benchmark_result["mops_total"] = float(results[6][ results[6].find("=") + 1 : ])
    benchmark_result["mops_thread"] = float(results[7][ results[7].find("=") + 1 : ])
    benchmark_result["operation_type"] = results[8][ results[8].find("=") + 1 : ]
    benchmark_result["verification"] = results[9][ results[9].find("=") + 1 : ]
    benchmark_result["version"] = results[10][ results[10].find("=") + 1 : ]
    #benchmark_result["cpu_usage"] = cpu_usage
    return benchmark_result

for file in os.listdir("Output-Kishorex64/"):
    if file.endswith(".txt"):
        with open("Output-Kishorex64/" + file[ : file.find(".")] + ".json", 'w') as fp:
            json.dump(scrape_file(file), fp)
