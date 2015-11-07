number=4
while [ $number -le 6 ]; do
  export OMP_NUM_THREADS=$number
  python run_benchmarks_serially.py $number
  (( number++ ))
done
