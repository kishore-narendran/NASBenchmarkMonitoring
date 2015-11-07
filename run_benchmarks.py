import os
import subprocess
import psutil
import time

#Enter the list of binary benchmarks here
#NOTE - Enter ONLY the binaries" filenames
benchmarks = ['bt.C', 'cg.C', 'ep.C', 'ft.C', 'is.C', 'lu.C', 'mg.C', 'sp.C', 'ua.C']

#Function to get the pid of the current benchmark
def get_pid(name):
    return int(subprocess.check_output(["pgrep",name]))

#Iterating and executing the benchmarks
for benchmark in benchmarks:
    print "Running benchmark " + benchmark

    #Path to the benchmark binary with respect to script
    benchmark_path = "benbin/" + benchmark
    run_benchmark= [benchmark_path]

    #Output file path containing the results of the test
    output_file_path = "output/" + benchmark.replace(".", "").lower() + ".txt"
    output_file = open(output_file_path,"w+");

    #Running the benchmark as a separate process
    benchmark_process = subprocess.Popen(run_benchmark, shell=True, stdout=output_file)
    benchmark_process_id = get_pid(benchmark)

    #Tracking the cpu usage of the various benchmarks
    benchmark_cpu_usages = []
    while benchmark_process.poll() is None:
        try:
            benchmark_process_info = psutil.Process(benchmark_process_id)
            benchmark_cpu_usages.append(benchmark_process_info.cpu_percent(interval=1.0))
        except psutil.AccessDenied:
            break
    output_file.close()

    #Appending the CPU usage of the benchmarks to the output file
    with open(output_file_path, "a") as output_file:
        output_file.write(",".join(map(str, benchmark_cpu_usages)))
