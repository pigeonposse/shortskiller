/**
 * Change GH Data.
 *
 * @description Change GH Data.
 */
const { exec }      = require( 'child_process' )
const { promisify } = require( 'util' )
const { join }      = require( 'path' )
const fs            = require( 'fs' )
const execPromise   = promisify( exec )

const tempFilePath = join( __dirname, 'topics.json' );

( async () => {

	try {

		const pkg    = await require( '../package.json' )
		pkg.keywords = Array.isArray( pkg.keywords ) ? pkg.keywords.slice( 0, 19 ) : []
 
		const repoOwner = 'pigeonposse'
		const topicData = {
			names : pkg.keywords,
		}
		fs.writeFileSync( tempFilePath, JSON.stringify( topicData ) )

		const cmds = [
			`gh repo edit ${pkg.repository.url} -d "${pkg.description}" -h "${pkg.homepage}"`,
			`gh api -X PUT /repos/${repoOwner}/${pkg.name}/topics --input '${tempFilePath}'`,
		]

		for ( const cmd of cmds ) {

			try {

				const { stdout, stderr } = await execPromise( cmd )
				if ( stderr ) throw Error( stderr )
				console.log( `✅ Successfully exec "${cmd}".\n\tstdout: ${stdout || 'Nothing'}` )
			
			} catch ( error ) {
        
				throw Error( `CMD "${cmd}":` + error.message )
			
			}
		
		}
	
	} catch ( error ) {

		console.error( 'Error in gh update.', error )
		process.exit()
	
	}finally{

		fs.unlinkSync( tempFilePath )
	
	}

} )()
