export default {
    name: 'Sobyte',
    displayName: 'Sobyte',
    author: 'Sobhan Bera <https://github.com/sobhanbera>',
    developerName: 'Sobhan Bera',
    /** @version = String( @vc + "." + @vn )
     *
     * this version if derived like this
     *
     * `major_change . updates . num_of_files . num_of_lines`
     *
     * 1. major_change => how many time major changes are done
     * 2. updates => how many times app is updated
     * 3. num_of_files => number of files under the app directory
     * 4. num_of_lines => total number of lines in all the files in app directory
     */
    version: '1.0.142.22601',
    /** @vc - version code */
    vc: 0,
    /** @vn - version number */
    vn: 1,
}

// according to this details if a user has downloaded
// a previous version of sobyte then a update prompt will be shown

/**
 * @if @vc < @newvc or @vn < @newvn then:
 *      showAPromptForUpdaingTheApp()
 * @newvc and @newvn would be feathed from the server
 * whenever the new version of app is available
 */
