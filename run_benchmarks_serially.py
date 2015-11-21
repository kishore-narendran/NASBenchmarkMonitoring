import os
import sys
output_directory = 'Output-Kishorex64/'
small_tests = ['ft.A', 'ft.B', 'ft.C']
#small_tests = ['bt.A', 'bt.B', 'bt.C', 'cg.A', 'cg.B', 'cg.C', 'ep.A', 'ep.B', 'ep.C', 'ft.A', 'ft.B', 'ft.C', 'is.A', 'is.B', 'is.C', 'mg.A', 'mg.B', 'mg.C', 'sp.A', 'sp.B', 'sp.C', 'ua.A', 'ua.B', 'ua.C']
num_threads = int(sys.argv[1])
print num_threads
for j in range(len(small_tests)):
    benchmark_call = 'benbin/' + small_tests[j] + ' > ' + output_directory + small_tests[j][0:2] + '_' + small_tests[j][len(small_tests[j]) - 1] + '_' + str(num_threads) + '.txt'
    print 'Running benchmark ' + small_tests[j] + ' on ' + str(num_threads) + ' threads.'
    os.system(benchmark_call)
