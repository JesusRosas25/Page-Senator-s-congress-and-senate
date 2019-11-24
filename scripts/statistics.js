
var calculations ={

	membersParty:[{
			        dem:0,
                    rep:0,
                    ind:0,
                    total:0,
                    votedDem:0,
                    votedRep:0,
                    votedInd:0,
                    votedTotal:0,
		}],
                    leastLoyal:[],
                    mostLoyal:[],
                    leastEngaged:[],
                    mostEngaged:[],
		};

var arrayJSON

var app = new Vue({
    el: '#app',
    
    data:{
        
        list:{}
    }
});

var url = `https://api.propublica.org/congress/v1/113/${document.title.split(" ")[0] }/members.json`;
		
	

			fetch(url,{
				method: 'GET',
				headers: {
					'X-API-Key': "13rSU7E1ra2ol9j81cXUHYq6HIh0E07UpsLm4Ktp"
				}
			}).then(data => data.json())
				.then(data =>{
					
			
			arrayJSON = data.results[0].members;
				calculateMembersParty()
				loadLoyalty(arrayJSON,0);
				loadLoyalty(arrayJSON,1);
				loadAttendance(arrayJSON,0);
				loadAttendance(arrayJSON,1);

				app.list=calculations;

			})





function loadAttendance(array, most) {
    var atte = calculateTenpct(array, "missed_votes_pct", most ? 0 : 1);
    
    for (var a of atte ) {
        var table ={
            name: a.first_name + " " + (a.middle_name || "") + " " + a.last_name,
            votesMissed: a.missed_votes,
            percofVotesMissed: a.missed_votes_pct,
            link: a.url
        }

        if (most){
            calculations.mostEngaged.push(table);
        } else {
            calculations.leastEngaged.push(table);
        }
        }
        }


function loadLoyalty(array, most){
    var loyal = calculateTenpct(array, "votes_with_party_pct", most ? 0 : 1);
    
    for (var l of loyal ) {
        let table ={
            name: l.first_name + " " + (l.middle_name || "") + " " + l.last_name,
            numberPartyVotes: Math.floor(l.total_votes * l.votes_with_party_pct /100),
            percentagePartyVotes: l.votes_with_party_pct, link: l.url
        }
        
        if (most){
            calculations.leastLoyal.push(table);
        } else {
            calculations.mostLoyal.push(table);
        }
        }
        }


function calculateTenpct(array, key, asc){

    
        if (asc){
            array.sort(function(a,b){return b[key] -a[key]});    
        } else {
            array.sort(function(a,b){return a[key] -b[key]});    
        }

        let i = 0;
        while(i < Math.floor(array.length/10) || array[i][key]   == array[i-1][key]   ){
            i++;
        }

        return array.slice(0,i);

        }


function calculateMembersParty(){

        var republicans=[];
        var democrats=[];
        var independents=[];
    	var total=[];

        var info = document.querySelectorAll("#membersParty td");

         for(var s of arrayJSON){
        if(s.party == "R"){
            republicans.push(s);
        } else if (s.party=="D"){
            democrats.push(s);
        } else {
            independents.push(s);
        }
         
    
        }

        calculations.membersParty[0].rep=republicans.length;
        calculations.membersParty[0].dem=democrats.length;
        calculations.membersParty[0].ind=independents.length;
        calculations.membersParty[0].total=arrayJSON.length;

        calculations.membersParty[0].votedDem = (calculateAve(republicans)).toFixed(2)+ "%";
        calculations.membersParty[0].votedRep = (calculateAve(democrats)).toFixed(2)+ "%";
        calculations.membersParty[0].votedInd = (calculateAve(independents)).toFixed(2)+ "%";
		
	calculations.membersParty[0].votedTotal=((calculateAve(republicans)+calculateAve(democrats)+calculateAve(independents))/3).toFixed(2) + "%";
	//calculations.membersParty.votedTotal=calculations.membersParty.total*100/arrayJSON.length + "%";
	
	
        //calculations.membersParty[0].votedTotal=calculateAve(total);

        }


function calculateAve(array){
        let ave=0;
        for(let p of array){
            ave += p.votes_with_party_pct;
        }
        return ave/array.length;
        }



 /*let url = document.getElementById("senate") ? "https://api.propublica.org/congress/v1/113/senate/members.json" : "https://api.propublica.org/congress/v1/113/house/members.json" 
		   
		        getData(url,"13rSU7E1ra2ol9j81cXUHYq6HIh0E07UpsLm4Ktp")*/































































































/*
var statistics = {
                    dem:0,
                    rep:0,
                    ind:0,
                    total:0,
                    votedDem:0,
                    votedRep:0,
                    votedInd:0,
                    votedtotal:0,
                    leastLoyal:[],
                    mostLoyal:[],
                    leastEngaged:[],
                    mostEngaged:[],
 };

var members = data.results[0].members;


calculateMembersParty();

if(document.title.split(" ")[1] ==  "loyalty") {
    loadLoyalty(members,0);
    loadLoyalty(members,1);

    populateTableParam(statistics.leastLoyal, "leastLoyalTable", "numberPartyVotes", "percentagePartyVotes" );
    populateTableParam(statistics.mostLoyal, "mostLoyalTable", "numberPartyVotes", "percentagePartyVotes" );
} 

if(document.title.split(" ")[1] ==  "attendance") {
    loadAttendance(members,0);
    loadAttendance(members,1);
    
    populateTableParam(statistics.leastEngaged, "leastEngagedTable", "votesMissed", "percofVotesMissed");
    populateTableParam(statistics.mostEngaged, "mostEngagedTable", "votesMissed", "percofVotesMissed");
}

function populateTableParam(array, id, key1, key2){
    let strTab="";
    
    for (let member of array){
        strTab += "<tr><td>";
        strTab += `<a href="${member.link}"> ${member.name} </a>`;
        strTab += "</td><td>";
        strTab += member[key1];
        strTab += "</td><td>";
        strTab += member[key2] + "%";
        strTab += "</td></tr>" ;

        }

        document.getElementById(id).innerHTML = strTab;
        }


function loadAttendance(array, most) {
    var atte = calculatetenpct(array, "missed_votes_pct", most ? 0 : 1);
    
    for (var a of atte ) {
        let obj ={
            name: a.first_name + " " + (a.middle_name || "") + " " + a.last_name,
            votesMissed: a.missed_votes,
            percofVotesMissed: a.missed_votes_pct,
            link: a.url
        }

        if (most){
            statistics.mostEngaged.push(obj);
        } else {
            statistics.leastEngaged.push(obj);
        }
        }
        }


function loadLoyalty(array, most){
    var loyal = calculatetenpct(array, "votes_with_party_pct", most ? 0 : 1);
    
    for (var l of loyal ) {
        let obj ={
            name: l.first_name + " " + (l.middle_name || "") + " " + l.last_name,
            numberPartyVotes: Math.floor(l.total_votes * l.votes_with_party_pct /100),
            percentagePartyVotes: l.votes_with_party_pct
        }
        
        if (most){
            statistics.leastLoyal.push(obj);
        } else {
            statistics.mostLoyal.push(obj);
        }
        }
        }


function calculatetenpct(array, key, asc){

    
        if (asc){
            array.sort(function(a,b){return b[key] -a[key]});    
        } else {
            array.sort(function(a,b){return a[key] -b[key]});    
        }

        let i = 0;
        while(i < Math.floor(array.length/10) || array[i][key]   == array[i-1][key]   ){
            i++;
        }

        return array.slice(0,i);

        }


function calculateMembersParty(){

        let republicans=[];
        let democrats=[];
        let independents=[];
    

        var info = document.querySelectorAll("#membersParty td");

         for(let m of members){
        if(m.party == "R"){
            republicans.push(m);
        } else if (m.party=="D"){
            democrats.push(m);
        } else{
            independents.push(m);
        }
         
    
        }

        statistics.rep=republicans.length;
        statistics.dem=democrats.length;
        statistics.ind=independents.length;
        statistics.total=members.length;

        statistics.votedDem =(statistics.dem*100/statistics.total).toFixed(3) + "%";
        statistics.votedRep = (statistics.rep*100/statistics.total).toFixed(3) + "%";
        statistics.votedInd = (statistics.ind*100/statistics.total).toFixed(3)+ "%";
        statistics.votedtotal=statistics.total*100/members.length + "%";

        info[1].innerHTML=statistics.rep;
        info[2].innerHTML=statistics.votedRep;
        info[4].innerHTML=statistics.dem;
        info[5].innerHTML=statistics.votedDem;
        info[7].innerHTML=statistics.ind;
        info[8].innerHTML=statistics.votedInd;
        info[10].innerHTML=statistics.total;
        info[11].innerHTML=statistics.votedtotal;

        }


function calculateAverage(array){
        let ave=0;
        for(let p of array){
            ave += p.votes_with_party_pct;
        }
        return ave/array.length;
        }
*/



 /*const tenPct = (array,key,isAscendent) => {
                let result;
                let i;
                let aux = isAscendent ? 
                            [...array].sort((a,b) => a[key] - b[key]) 
                        : 
                            [...array].sort((a,b) => b[key] - a[key])
                
                let tenPct = parseInt(aux.length*0.1)

                result = aux.slice(0,tenPct)



                i = result.length

                while(aux[i][key] == result[result.length - 1][key]){
                    result.push(aux[i])
                    i++
                }

                return result

            }

            calculateMembersParty()

            statistics.leastEngaged = tenPct(arrayJSON,"missed_votes_pct",false)
            statistics.mostEngaged = tenPct(arrayJSON,"missed_votes_pct",true)
            statistics.mostEngaged = tenPct(arrayJSON,"votes_with_party_pct",false)
            statistics.leastEngaged = tenPct(arrayJSON,"votes_with_party_pct",true)*/

/**************************************************************************/


/*function createTables(id,array){
    
}*/
/*function leastLoyal(array){
    let loyalTable="";
    
    for(let person of array){
        leastLoyal +=*/


    //document.getElementById(loyalTable).innerHTML=leastLoyal;




    
    


