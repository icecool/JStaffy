<?php

function GetRandomHex($amount=100,$range=[100000000,200000000],$filter=false)
{
    $h=[];
    $i=0;
    //$j=0;
    while($i<$amount)
    {
        //$j++;
        $x = random_int($range[0],$range[1]);
        $s = strtoupper(dechex($x));
        $pos = strpos($s,'6');
        if($filter && ($pos !== false || strlen($s)!=7)) {continue;}
        if(!isset($h[$s]))
        {
            $h[] = $s;
        }
        $i++;
    }
    //echo 'Total iterations: '.$j.'<br>';
    return $h;
}

function csv2json($path='data.csv')
{
    $p=[];
    if(($handle=fopen($path,"r"))!==FALSE)
    {
        while(($data=fgetcsv($handle,1000,","))!==FALSE)
        {
            $p[]=[trim($data[0]),trim($data[1])];
        }
        fclose($handle);
    }
    echo json_encode($p);
}

//csv2json();

$hex=GetRandomHex();
for ($i=0,$c=count($hex); $i < $c; $i++) { 
    echo $hex[$i].'<br>';
}

?>
