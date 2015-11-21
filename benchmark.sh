number=2
while [ $number -le 8 ]; do
  export OMP_NUM_THREADS=$number
  python run_benchmarks_serially.py $number
  (( number++ ))
done
