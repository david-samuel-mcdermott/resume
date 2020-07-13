var selection = window.location.hash.substr(1)

if ( selection === '' ) {
	selection = 'generic'
}

$.ajaxSetup({
	"error":errorHandler
})

renderFromJSON(selection)
