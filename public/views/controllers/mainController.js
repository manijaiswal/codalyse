var MainController  = angular.module('MainController',['ApiFactory','ui.bootstrap','chart.js','ngFileUpload']);

MainController.controller('MainController',['$scope','$http','$location','ipCookie','ApiFactory',"$window",function($scope,$http,$location,ipCookie,ApiFactory,$window){
    console.log('In main controller');
    var vm  =  this;

    var RESOURCE_URL      = ApiFactory.RESOURCE_URL() 
    vm.form               = {};
    $scope.bg_disable = false;
    $scope.loaded     = true;
    $scope.data = [];

    $scope.des_math = [];
    $scope.analyse  = function(data){
        var x = data.sort(function(a,b){
            return a.subject - b.subject
        })

        var maths = [];
        var phy  = [];
        var chem  = [];
        var avg_marks = 0;

        for(var i=0;i<x.length;i++){
            avg_marks=avg_marks+  parseInt(x[i]['marks'])
            if(x[i]['subject']=='maths'){
                maths.push(x[i])
            }
            if(x[i]['subject']=='physics'){
                phy.push(x[i]);
            }
            if(x[i]['subject']=='chemistry'){
                chem.push(x[i]);
            }
        }
        $scope.avg = avg_marks/x.length;

        $scope.des_math=maths.sort(function(a,b){
            return b.marks-a.marks;
        })
        $scope.des_phy=phy.sort(function(a,b){
            return b.marks-a.marks;
        })
        $scope.des_chem=chem.sort(function(a,b){
            return b.marks-a.marks;
        })


        $scope.greater_than_60 = x.filter((data)=>data.marks>60);
        var topper = data.sort(function(a,b){
            return a.name.localeCompare(b.name);
        }) 

        $scope.total = topper;

        var flag = 0;
        var avg = [];
        var total_marks= 0;
        var highest = 0;
        var student = '';
        for(var i=0;i<topper.length;i++){
            if(flag==3){
                flag = 1;
                avg.push(total_marks)
                if(total_marks>highest){
                    highest = total_marks;
                    student = topper[i]['name'];
                }
                total_marks = parseInt(topper[i]['marks']);
            }
            else{
               total_marks = total_marks+ parseInt(topper[i]['marks']); 
               flag+=1;
            }
            if(i==topper.length-1){
                avg.push(total_marks)
                if(total_marks>highest){
                    highest = total_marks;
                    student = topper[i]['name'];
                }
            }
        }
       
        $scope.highest_marks = highest;
        $scope.topper  = student;
    }
 
    $http({
        url:'data/data.json',
        method:'GET'
    }).then((res)=>{
        console.log(res);
        $scope.data = res.data
        $scope.analyse($scope.data);

        
    }).catch((e)=>{
        console.log(e);
        alert("something went wrong");
    })


}])




MainController.directive("compareTo", function () {
	return {
		require: "ngModel",
		scope: {
			confirmPassword: "=compareTo"
		},
		link: function (scope, element, attributes, modelVal) {

			modelVal.$validators.compareTo = function (val) {
				return val == scope.confirmPassword;
			};

			scope.$watch("confirmPassword", function () {
				modelVal.$validate();
			});
		}
	};
});
