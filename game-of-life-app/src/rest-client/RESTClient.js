import $ from "jquery";

export default class RESTClient
{
    constructor(remote) {
        this.remote = remote;
    }

    post(url, json) {
        let returnedData = $.ajax({
            type: "POST",
            url: `${this.remote}${url}`,
            cache: false,
            data: JSON.stringify(json),
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            async: false,
            success: function (data) {
                console.log("Success! " + data);
            }
        });
        return returnedData;
    }
}
