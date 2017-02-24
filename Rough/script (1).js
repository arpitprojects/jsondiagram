get_value();

function get_value()
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			var data = this.responseText;
	    	initiate(JSON.parse(data));
		}
	};
	xhttp.open("GET", "input.json", true);
	xhttp.send();
}

function initiate(myArr)
{
	console.log(myArr);
	var v_dist = {};
	var v_time = {};
	var visited = [];

	for(var key1 in myArr)
	{
		visited[key1]=1e9;
		if(!(key1 in v_dist))
		{
			v_dist[key1]={};
			v_time[key1]={};
		}
		for(var key2 in myArr[key1])
		{
			visited[key2]=1e9;
			v_dist[key1][key2] = myArr[key1][key2][1];
			v_time[key1][key2] = myArr[key1][key2][0] / myArr[key1][key2][1];
		}
	}
	dijisktra_algo(v_dist,visited,'S');
}

function dijisktra_algo(v,visited,source)
{
	var queue = [];
	var visited_path = {};

	queue.push([source,0]);
	visited[source]=0;
	visited_path[source] = [];
	while(queue.length)
	{	
		var front = queue.shift();
		console.log(front);
		var x = front[0];
		for(var i in v[x])
		{
			console.log("\t"+i);
			if(visited[i] > visited[x]+v[x][i] && i != source)
			{
				var w = [i,visited[i]];
				console.log("w:\t\t"+w);
				var index = queue.indexOf(w);
				console.log("index:\t\t"+index);
				if(index!=-1)
					queue.splice(index);
				console.log("q.l:\t\t"+queue.length);
				visited[i] = visited[x]+v[x][i];
				w[1] = visited[i];
				queue.push(w);
				console.log("w:\t\t"+w);
				console.log("q.l:\t\t"+queue.length);
				visited_path[i]=[];
				for(var key in visited_path[x])
					visited_path[i].push(visited_path[x][key]);
				visited_path[i].push(x);
			}
		}
	}
	for(var key in visited)
		console.log(key +" "+visited_path[key]);
	console.log(visited['U']);
	console.log(visited_path['U']);
}