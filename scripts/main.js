
const app = new Vue({
  el: '#app',
  data: {
    members: [],
    checkParties: ["D","R","I"],

    state_select:"all",
	seniority:0,
	votes_with_party_pct:0,
	
	

  },


 computed: {
                    filterMembers(){
                        return this.members.filter(e => app.checkParties.includes(e.party) &&  (app.state_select == e.state || app.state_select == "all") ? e : null)
                    },
                    statesArray(){
                        let aux = []
                        this.members.forEach(e => !aux.includes(e.state) ? aux.push(e.state) : null)
                        return aux.sort()
                    }
                }
            })

                    function getData(url,key){
                        fetch(url,{
                            method: 'GET',
                            headers: {
                                'X-API-Key': key
                            }
                        }).then(function(response){
                            if(response.ok){
                                return response.json()
                            }else{
                                throw new Error()
                            }
                        }).then(function(json){
                            app.members = json.results[0].members
                           //app.table= createTable()


                        }).catch(function(error){
                            console.log(error)
                        })
                    }

           

                    function stateSelect(){
         
     
            let statesCod  = ["all", "AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID",
                      "IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE",
                      "NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT",
                      "VA","VI","VT","WA","WI","WV","WY"];

            let states = ["All States","Alaska","Alabama","Arkansas","American Samoa","Arizona","California","Colorado",
              "Connecticut","District of Columbia","Delaware","Florida","Georgia","Guam","Hawaii","Iowa","Idaho","Illinois","Indiana","Kansas","Kentucky","Louisiana","Massachusetts","Maryland",
              "Maine","Michigan","Minnesota","Missouri","Mississippi","Montana","North Carolina"," North Dakota","Nebraska",
              "New Hampshire","New Jersey","New Mexico","Nevada","New York","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico",
              "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Virginia","Virgin Islands",
              "Vermont","Washington","Wisconsin","West Virginia","Wyoming"];
              
              let ststesel= document.getElementById("state_select");
    
            for (let i=0; i<statesCod.length;i++) {
                  
            ststesel.innerHTML +="<option value=\"" + statesCod[i]+ "\">"+ states[i]+"</option>";`<option value="all">All States</option>`
            
          //ststesel.push(statesCod[i].state)
          
            }
}
         
            
            stateSelect()
    		function createDropdown(){

    			//let state_select = []
    			let StateSelect = document.getElementById("state_select")
                
				
    			let members = stateSelect.results[0].members

    			for(let i = 0; i < members.length; i++){
    				
                    if(!state_select.includes(members[i].state)){
    					state_select.push(members[i].state)
    				}
    				
    			}

    			state_select.sort()

    			select.innerHTML = `<option value="all">All</option>
    								${state_select.map(state => `<option value="${state}">${state} </option>`).join("")}`

    		}
                let url = document.getElementById("senate") ? "https://api.propublica.org/congress/v1/113/senate/members.json" : "https://api.propublica.org/congress/v1/113/house/members.json" 
		   
		        getData(url,"13rSU7E1ra2ol9j81cXUHYq6HIh0E07UpsLm4Ktp")
/*

            function updateUI(){app.table=createTable();
								updateUI;
}

    		    function createTable(){
    				let tbody = document.getElementById("congress-data")
                    let arrayreturn=[];
					let selectedState = 
					document.getElementById("state_select").value
					
					let checkedParties = Array.from(document.querySelectorAll("input[id=party]:checked")).map( input => input.value)
					
    				for (let i = 0; i <arrayreturn.length; i++){
					if  (checkedParties.some(x => x.value == data[i].party) && 
            (data[i].state == selectedState || selectedState=="") ) {
				

	           let table = ""
				let members = members[i].state
	            for(let i = 0; i < members.length; i++){
	                
	            	if(checkedParties.includes(members[i].party) && (selectedState == members[i].state || selectedState == "all")){
	            		table += `<tr>
                          <td><a href= ${members[i].api_uri}>
                          ${members[i].first_name}
                          ${members[i].middle_name ||""}
                          ${members[i].last_name}</a>
                          </td>
                          <td>${members[i].party}</td>  
                          <td>${members[i].state}</td>
                          <td>${members[i].seniority}</td>
                          <td>${members[i].votes_with_party_pct + "%"}</td>
                        </tr>`
	            	}
	               arrayreturn.push(table);

	            }

	          return arrayreturn; 
    		}

    	createTable();*/

    		

		






/* var data;
            const app = new Vue({
            el:'#app',
            data:{
            members: [],
            parties:["R","D","I"],
            state_select: [],
        
    }
}) 

   
            function getData(url,key){
            fetch(url,{
            method: 'GET',
            headers: {
                'X-API-Key': "13rSU7E1ra2ol9j81cXUHYq6HIh0E07UpsLm4Ktp"
        }
            }).then(function(response){
            if(response.ok){
                return response.json()
            }else{
                throw new Error()
        }
            }).then(function(json){
            data = json
            createDropdown()
            createTable()

            }).catch(function(error){
                console.log(error)
            })
        }

            getData("https://api.propublica.org/congress/v1/113/senate/members.json","13rSU7E1ra2ol9j81cXUHYq6HIh0E07UpsLm4Ktp")
            

    		function createDropdown(){

    			let state_select = []
    			let select = document.getElementById("state_select")
    			let members = data.results[0].members

    			for(let i = 0; i < members.length; i++){
    				if(!state_select.includes(members[i].state)){
    					state_select.push(members[i].state)
    				}
    				
    			}

    			state_select.sort()

    			select.innerHTML = `<option value="all">All</option>
    								${state_select.map(state => `<option value="${state}">${state} </option>`).join("")}`

    		}

    		

    		function createTable(){
    			let tbody = document.getElementById("congress-data")
            

	            let members = data.results[0].members

	            let checkedParties = Array.from(document.querySelectorAll("input[id=party]:checked")).map( input => input.value)

	            let selectedState = document.getElementById("state_select").value

	            let table = ""

	            for(let i = 0; i < members.length; i++){
	                
	            	if(checkedParties.includes(members[i].party) && (selectedState == members[i].state || selectedState == "all")){
	            		table += `<tr>
	                            <td>
	                            	${members[i].last_name}, 
	                            	${members[i].first_name}
	                            	${members[i].middle_name || ""}
	                            </td>
	                            <td>${members[i].party}</td>
	                            <td>${members[i].state}</td>
	                        </tr>`
	            	}
	                

	            }

	            tbody.innerHTML = table
    		}

    	
         createTable()
    		document.querySelectorAll("input[id=party]").forEach(input => {
    			input.onchange = createTable
    		})

    		document.getElementById("state_select").onchange = createTable
            
            
            
            */

            /*var data;
      
      function getData(url,key){
      fetch(url,{
      method:'GET',
      headers: {
      'X-API-Key': key}
      }).then(function(response){
      if(response.ok){
      return response.json()
      }else{
      throw new Error()
      }
      }).then(function(json){
      data = json
      createDropdown()
      createTable()
          
      }).catch(function(error){
      console.log(error)
      })
      
      }
      
    getData("https://api.propublica.org/congress/v1/113/senate/members.json", "13rSU7E1ra2ol9j81cXUHYq6HIh0E07UpsLm4Ktp")
         
     
     function createDropdown(){
 
        let states = []
        let select = document.getElementById("states")
        let members = data.results[0].members
        
        for(let i = 0; i< members.length; i++){
            if(!states.includes(members[i].state)){
            states.push(members[i].state)
        }
            }
         states.sort()
         
         select.innerHTML = `<option value="all">All</option> ${states.map(state=> `<option value="${state}">${state}</option>`).join("")}`
         
         
         function createTable(){
    			let tbody = document.getElementById("congress-data")
	            let members = data.results[0].members
	            let checkedParties = Array.from(document.querySelectorAll("input[name=party]:checked")).map( input => input.value)

	            let selectedState = document.getElementById("states").value

	            let table = ""

	            for(let i = 0; i < members.length; i++){
	                
	            	if(checkedParties.includes(members[i].party) && (selectedState == members[i].state || selectedState == "all")){
	            		table += 
                            `<tr>
                          <td><a href= ${members[i].api_uri}>
                          ${members[i].first_name}
                          ${members[i].middle_name ||""}
                          ${members[i].last_name}</a>
                          </td>
                          <td>${members[i].party}</td>  
                          <td>${members[i].state}</td>
                          <td>${members[i].seniority}</td>
                          <td>${members[i].votes_with_party_pct + "%"}</td>
                        </tr>`
	            	}
	                

	            }

	            tbody.innerHTML = table
    		}
         
         congressTable()
         document.querySelectorAll("input[name=party]").forEach(input => {
    			input.onchange = createTable
    		})

    		document.getElementById("states").onchange = createTable


      
   
        */
     
     
