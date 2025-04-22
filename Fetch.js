	app.LoadPlugin( "Utils" );
	ip = app.GetIPAddress();
	port = 9995;
//Called when application is started.
async function OnStart()
{
	utils = app.CreateUtils();
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "Linear", "VCenter,FillXY" )

	//Create a text label and add it to layout.
	txt = app.CreateText( ip)
	txt.SetTextSize( 22 )
	lay.AddChild( txt )
	
	//Add layout to app.	
	app.AddLayout( lay )
	//setTimeout('firstOperation', 3500);

    //app.Alert( ip +":8080", "Type the following address into your browser" );

    serv = app.CreateWebServer( port,'ListDir,Upload' );
    serv.SetFolder( "/sdcard/DroidScript" );
    serv.Start();
    await app.ShowPopup( utils.Stringify(Fetch()));
//	app.ShowPopup(Fetch())
//	txt.SetText(PromiseSample())
	function firstOperation() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("First operation done"), 1000);
    });
}

function secondOperation() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Second operation done"), 1000);
    });
}

firstOperation()
    .then(result => {
        alert(result);
        return secondOperation();
    })
    .then(result => {
        alert(result);
        //return Fetch();
    });
}





async function Fetch()
{
	fetch('http://'+ip+":"+port+'/').then(response => {
        if (!response.ok) {
        alert("Error");
            return 'Network response was not ok';
        }
        app.WriteFile("Html.html",  response.xml());
        return response.xml();//json(); // Parse the JSON from the response
    }).then(data => {
    app.WriteFile("data.txt", data);
    alert(data);
        return data; // Handle the data from the API
    }).catch(error => {
        return 'There was a problem with the fetch operation:' +  error;
    });
    return "Nothing";
}