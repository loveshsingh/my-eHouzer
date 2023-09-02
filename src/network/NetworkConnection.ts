import {getAuthAsyncStorage} from "../storage/AuthAsyncStorage";

/**
 * @author Lovesh Singh.
 * @since 25-12-2022.
 * @description network request manager.
 * @param url API request url.
 * @param method request method.
 * @param body request body.
 * @param requestHeaders request headers.
 * @returns {Promise<unknown>} promise.
 */
export const fetchDataFromAPI = (url: string, method: any, requestHeaders: any = {}, body?: any) => new Promise(async (resolve, reject) => {
    console.log("requestHeader", requestHeaders['content-type'])
    requestHeaders['Accept'] = '*/*'
    if (!(body instanceof FormData)) {
        requestHeaders['content-type'] = 'application/json';
    }
    const authStorage: any = await getAuthAsyncStorage()
    const userDetails = authStorage?.userDetails
    if (userDetails) {
        requestHeaders['Authorization'] = `Bearer_${JSON.parse(userDetails)?.token}`
    }

    console.log('NetworkConnection.js url -->', url);
    console.log('NetworkConnection.js method -->', method);
    console.log('NetworkConnection.js requestHeaders -->', requestHeaders);
    console.log('NetworkConnection.js body -->', body);


    return fetchWithTimeout(url, {
        method: method,
        headers: requestHeaders,
        body: body,
        timeout: 35000 // 35 seconds.
    })
        .then(response => {
            console.log('NetworkConnection.js Raw Response -->', response)
            let statusCode = +response.status;
            /* if (statusCode < 300) { // If success than execute other response.
                 console.log("response success")*/
            if(url.includes("download")){
                //console.log("download-resolve",url)
                resolve(response)
            }else{
                resolve(response.json())
            }
            // return response.json();
            /*} else {
                console.log("reject ....................")
                reject(response)
            }*/
        })
        .catch(error => { // To handle error.
            console.log("Network error" + error.message);

            let title = 'Something went wrong'
            let description = 'Unknown Error.'

            if (error.name === 'AbortError') { // if request timeout.
                title = 'Request timeout'
                description = 'Server out of reachable.'
                error.message = 'InternetConnectionProblemMsg'
            }

            reject({...error, status: NetworkStatus.REQUEST_TIMEOUT, statusText: title})
        })
})

/**
 * @author Lovesh Singh.
 * @since 25-12-2022.
 * @param resource resource url
 * @param options request options.
 * @returns {Promise<*>} promise.
 * @description fetch request with Request options.
 * <p> default timeout will be set for 8 seconds.</p>
 */
export const fetchWithTimeout = async (resource: string, options: RequestOption) => {
    console.log("fetch With Timeout Called........................")
    const {timeout = 8000} = options;

    console.log("options", options)

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response: any = await fetch(resource, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);

    return response;
}

/**
 * @author Lovesh Singh.
 * @since 25-12-2022.
 * @description network request options.
 */
interface RequestOption {
    method: string,
    headers: {},
    timeout: number,
    body?: string
}

export const NetworkStatus = {
    REQUEST_TIMEOUT: 408,
    NO_DATA_FOUND:401,
}
