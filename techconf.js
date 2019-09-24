$(document).ready(function(){

    var list1 = [];
    var list2 = [];

    function isJSON(str){try{JSON.parse(str);}catch(e){return(false);}return(true);}

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function showList1()
    {
        $("#list1").html("");
        list1.forEach(function(val){
            $("#list1").append('<option id="'+val[0]+'" value="'+val[0]+'">'+val[0]+'</option>');
        });
    }

    function load_data(){
        $.get("./?json").done(function(data)
        {
            if(isJSON(data))
            {
                var obj = JSON.parse(data);
                obj.forEach(function(val){
                    list1.push(val);
                });
                showList1();
                //console.log(list1);
            } else {
                console.log(data);
            }
        });
    }

    function Generate()
    {
        var cnt = list1.length;
        if(cnt>0)
        {
            var rnd = getRandomInt(0,cnt-1);
            console.log('count='+cnt+', rnd='+rnd);
            $("#list2").append('<option id="'+list1[rnd][0]+'" value="'+list1[rnd][0]+'">'+list1[rnd][0]+'</option>');
            list1.splice(rnd, 1);
            showList1();
        }
    }

    function test(){
        $.get("./?json").done(function(data){
            if(isJSON(data))
            {
                var obj = JSON.parse(data);
                /*
                obj.forEach(function(val){
                    console.log(val);
                });
                */
               var cnt = obj.length;
               //console.log('totoal items: ' + cnt);
               //console.log(getRandomInt(0,cnt));
            } else {
                console.log(data);
            }
        });
    }

    load_data();

    $("#generate").click(function(){
        Generate();
    });

});
