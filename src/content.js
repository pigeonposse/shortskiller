/**
 * Todo.
 *
 * @description Todo.
 * @version 1.0.0
 *
 */

const init = () => {

	let url, ytUrl

	url   = window.location.href
	ytUrl = 'https://www.youtube.com'
	
	if( url.startsWith( ytUrl + '/shorts' ) ) window.location.href = ytUrl

}

setInterval( init, 500 )
