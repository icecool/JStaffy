$(document).ready(function(){
// requires jquery

    var list1 = []; // all IDs
    var list2 = []; // for random selected

    function isJSON(str){try{JSON.parse(str);}catch(e){return(false);}return(true);}

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function show_list1()
    {
        $("#list1").html("");
        list1.forEach(function(val){
            $("#list1").append(val[0]+"\n");
        });
    }

    function show_list2()
    {
        $("#list2").html("");
        list2.forEach(function(val){
            $("#list2").append(val[0]+' - '+val[1]+"\n");
        });
    }

    function load_list1(){
        $.get("./?json").done(function(data)
        {
            if(isJSON(data))
            {
                var obj = JSON.parse(data);
                obj.forEach(function(val){
                    list1.push(val);
                });
                show_list1();
                //console.log(list1);
            } else {
                console.log(data);
            }
        });
    }

    function Generate1()
    {
        var cnt = list1.length;
        if(cnt>0)
        {
            var rnd = getRandomInt(0,cnt-1);
            console.log('count='+cnt+', rnd='+rnd+', value='+list1[rnd][0]);
            list2.push(list1[rnd]);
            list1.splice(rnd, 1);
            show_list1();
            show_list2();
        }
    }

    function Generate2()
    {
        var cnt = list1.length;
        if(cnt>1)
        {
            $.ajax({
                url: "https://api.random.org/json-rpc/2/invoke",
                type:"POST",
                data:`{
                    "jsonrpc": "2.0",
                    "method": "generateIntegers",
                    "params": {
                        "apiKey": "00000000-0000-0000-0000-000000000000",
                        "n": 1,
                        "min": 0,
                        "max": `+(cnt-1)+`,
                        "replacement": false,
                        "base": 10
                    },
                    "id": 4546
                }`,
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success: function(e){
                    var rnd=e.result.random.data[0];
                    console.log('count='+cnt+', rnd='+rnd+', value='+list1[rnd][0]);
                    list2.push(list1[rnd]);
                    list1.splice(rnd, 1);
                    show_list1();
                    show_list2();
                }
            }); 
        } else {
            if(cnt==1)
            {
                var rnd=0; // only one element left!
                console.log('count='+cnt+', rnd='+rnd+', value='+list1[rnd][0]);
                list2.push(list1[rnd]);
                list1.splice(rnd, 1);
                show_list1();
                show_list2();
            }
        }
    }

    load_list1(); // get data from json (based on csv file)

    $("#btn").click(function(){
        Generate1();
    });

});
