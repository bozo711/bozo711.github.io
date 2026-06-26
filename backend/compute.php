<?php
$n = intval($argv[1] ?? 20);
$count=0; $num=1; $sum=0;
while ($count < $n) { $num++; $p=true; for ($i=2;$i*$i<=$num;$i++){ if ($num%$i==0){$p=false;break;} } if ($p){ $sum+=$num; $count++; } }
echo json_encode(["lang"=>"PHP","what"=>"sum of first $n primes","result"=>$sum]);
