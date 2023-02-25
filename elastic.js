// elastic search
function doSearch () {
    document.querySelector(".landing form").addEventListener("submit",(e)=>{
        e.preventDefault();
        var searchHost = 'http://127.0.0.1:9200/leaks/_search';
        var body = {
            'size': 50
        };
        var query = {
            'bool': {}
        }

        query.bool.must = {
            'multi_match': {
            'query': document.getElementById('elk-search').value,
            'fields': 'column1'
            }
        };
        body.query = query;


        // Perform the request.
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('POST', searchHost, false);
        xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xmlHttp.send(JSON.stringify(body));
        var response = xmlHttp.responseText;

        
        if(JSON.parse(response)["hits"]["total"]["value"]==0){
            document.getElementById("my-template").innerHTML=`
                <swal-title>
                    Good news
                </swal-title>
                <swal-html>
                    <div class="black-color">
                        <h4 class="suc">No pwnage found!</h4>
                        <p>No breached accounts and no pastes</p>
                    </div>
                </swal-html>
                <swal-icon type="success" color="var(--main-color)"></swal-icon>
                <swal-button color="var(--main-color)" type="cancel">
                    Great!
                </swal-button>
                <swal-footer><a href="../faq/faq.html#avoid">How to avoid breaches?</a></swal-footer>`;
            }
        else if(JSON.parse(response)["hits"]["total"]["value"]==1){
            document.getElementById("my-template").innerHTML=`
                <swal-title>
                    Oops...
                </swal-title>
                <swal-html>
                    <div class="black-color">
                        <h4 class="faild">Pwned!</h4>
                        <p>Pwned in data breaches and found pastes</p>
                    </div>
                </swal-html>
                <swal-icon type="error" color="red"></swal-icon>
                <swal-button color="var(--main-color)" type="cancel">
                    Ok
                </swal-button>
                <swal-footer><a href="../faq/faq.html#breached">I found that my email was breached, now what?</a></swal-footer>`;
            }
        Swal.fire({
            template: '#my-template'
        })
    })
};
doSearch();