(function(){
    angular.module('fixApp')
    .service('filter', filter)

    function filter(){
        var myfixtures =[]
        this.filterdDates = function(fixtures){
    for (var i = 0; i < fixtures.length; i++) {
        var dateNow= Date.now();
        var dataDate = new Date(fixtures[i].date);
        if(dataDate>dateNow){
            console.log("true")
            myfixtures.push(fixtures[i])

        }

 

        
    }

      return myfixtures
   
        }

    }
})();