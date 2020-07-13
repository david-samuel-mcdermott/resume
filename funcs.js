
/** Primary function call - trigger AJAX get JSON and begin renders
 *  Fetches JSON with structure like in contents/layouts/generic.json 
 *  All JSON are contents/layouts/ for this call
 *  JSON to fetch is determined in autorun.js
 *
 *  @param selection The name of the JSON to pull 
 */
function renderFromJSON(selection) {
	$.getJSON("contents/layouts/"+selection+".json", render)
}

/** Dispatch the layout given from renderFromJSON
 *  Triggers fetch and render of sections
 *
 *  @param partsMap The JSON fetched from renderFromJSON
 */
function render(partsMap) {
	populateTitle(partsMap)
	populateContactInfo(partsMap)
	populateSkills(partsMap)
	populateSummary(partsMap)
	populateExperience(partsMap)
	populateEducation(partsMap)
}

/** Append each element of the array input to the ul in arg 2
 *
 *	@param list The array to put into the list 
 *	@param ul The UL element to put each element into
 *	@param punctuate Whether or not to make it coma separated
 */
function liFromList(list, ul, punctuate) {
	list.forEach(function(element, idx, ary){
		if (!punctuate || idx === ary.length-1)
			$("<li>"+element+"</li>").appendTo(ul)
		else
			$("<li>"+element+",</li>").appendTo(ul)
	})
}

/** Populate title from AJAX
 * 
 *  @param partsMap The JSON dispatched to here by render
 */
function populateTitle(partsMap) {
	$("#title").each(function () {
		this.innerText = partsMap.title || ""
	})
}

/** Populate contact info from AJAX
 *
 *  @param partsMap The JSON dispatched to here by render
 */
function populateContactInfo(partsMap) {
	var selection = partsMap.contact || "general"
	
	//AJAX
	$.getJSON("contents/contacts/"+selection+".json", function(contactMap) {
		//Do telephone
		$("#telephone").each(function () {
			this.innerText = contactMap.phone_text || ""
			this.href = "tel:"+(contactMap.phone_number || "")
		})
		//Do email
		$("#email").each(function () {
			this.innerText = contactMap.email || ""
			this.href = "mailto:"+(contactMap.email || "")
		})
		//Do linkedin
		$("#linkedin").each(function () {
			this.href = contactMap.linkedin || ""
			this.innerText = "LinkedIn"
		})
	})
}

/** Populate skills info from AJAX
 *
 *	@param partsMap The JSON dipatched to here by render
 */
function populateSkills(partsMap) {
	var selection = partsMap.skills || []
	
	selection.forEach( function(element) {
		
		//Populate skills
		$("#skills").each(function() {
		
			$("<div id=\""+element+"\" class=\"skill\"></div>").appendTo(this)
		
			//AJAX - get skills
			$.getJSON("contents/skills/"+element+".json", function(skillObject) {

				$("#"+element).each(function(){
					//Create skill objects
					$("<span>" +  skillObject.name +"</span>").appendTo(this)
					var newlist = $("<ul><ul>")

					//Populate each skill
					liFromList(skillObject.skills, newlist, true)
					
					newlist.appendTo(this)
				})
			})

		})
		
	})
}

function populateSummary(partsMap) {
	
	var choice = partsMap.summary || "generic"
	
	//AJAX
	$.get("contents/summaries/" + choice + ".txt", function(page) {
		
		$("#summary").each(function() {
			
			this.innerText = page
			
		})
		
	})
	
}

function populateExperience(partsMap) {
	
	var experiences = partsMap.experience || []
	experiences.forEach(function(element) {
		
		$("#experience").each(function() {
			var container = $("<div id=\""+element+"\" class=\"job\"></div>")
			container.appendTo(this)
		})
		
		//AJAX 
		$.getJSON("contents/experience/" + element + ".json", function(experience) {
			
			//Populate via JQuery
			$("#"+element).each(function() {
				
				$("<span class=\"job_title\">" + experience.title + "</span>").appendTo(this)
				$("<span class=\"job_company\">" + experience.company + "</span>").appendTo(this)
				$("<span class=\"job_location\">" + experience.town + "</span>").appendTo(this)
				$("<span class=\"job_time\">" + experience.time + "</span>").appendTo(this)
				$("<br>").appendTo(this)
				var exp_list = $("<ul class=\"job_list\"></ul>")
				
				liFromList(experience.list, exp_list, false)
				
				exp_list.appendTo(this)
			})
			
		})
		
	})
	
}

function populateEducation(partsMap) {
	
	var education = partsMap.education || []
	education.forEach(function(element) {
		
		$("#education").each(function(){
			$("<div id=\""+element+"\"class=\"school\"></div>").appendTo(this)
		})
		
		//AJAX
		$.getJSON("contents/education/" + element + ".json", function(school) {
			
			$("#"+element).each(function() {
				
				$("<span class=\"school_degree\">" + school.degree + "</span>").appendTo(this)
				$("<span class=\"school_name\">" + school.name + "</span>").appendTo(this)
				$("<span class=\"school_location\">" + school.location + "</span>").appendTo(this)
				$("<span class=\"school_graduation\">" + school.graduation + "</span>").appendTo(this)
				$("<br>").appendTo(this)
				$("<span class=\"school_courses\">Notable Coursework</span>").appendTo(this)
				var courses = $("<ul></ul>")
				liFromList(school.courses, courses, true)
				courses.appendTo(this)
				
			})
			
		})
		
	})
	
}

function errorHandler() {
	console.trace()
	alert("You broke it")
}
