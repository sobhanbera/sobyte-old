export default {
    name: 'Sobyte',
    displayName: 'Sobyte',
    author: 'Sobhan Bera <https://github.com/sobhanbera>',
    /** @version = String( @vc + "." + @vn ) */
    version: 0.1,
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
