# NASBenchmarkMonitoring
A python project that runs the NAS Parallel Benchmarks and then generates a JSON of the results and the CPU usage of the benchmark processes.

##NOTE
1. All the benchmark binaries must go inside the folder `benbin/`
2. Create a folder "output/" before running any of the scripts.
3. Install the requirements by `pip install -r requirements.txt`
4. To run the benchmarks `python run_benchmarks.py`
5. To scrape the results and generating JSON files `python scrape_outputs.py`
