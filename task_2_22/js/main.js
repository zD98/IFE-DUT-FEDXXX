window.onload = function() {
	document.getElementById('lnr').onclick = battonCallback;
	document.getElementById('nlr').onclick = battonCallback;
	document.getElementById('lrn').onclick = battonCallback;
};

function battonCallback(event) {
	clearAnimation();
	var queue;

	switch (event.target.id) {
		case 'lnr': 
		queue = inTraverse();
		break;

		case 'nlr':
		queue = preTraverse();
		break;

		case 'lrn':
		queue = postTraverse();
		break;
	}

	traverse(queue);
}

function preTraverse() {
	var queue = [];
	var pos = document.getElementById('root');
	var traversalRecording = [];
	traversalRecording.push(pos);

	while (traversalRecording.length > 0) {
		if (pos != undefined) {
			queue.push(pos);
			pos = getChildren(pos)[0];
			traversalRecording.push(pos);
			continue;
		} else {
			traversalRecording.pop();
			pos = traversalRecording.pop();
			pos = getChildren(pos)[1];
			traversalRecording.push(pos);
		}

		if (pos == undefined) {
			traversalRecording.pop();
			pos = traversalRecording.length == 0 ? pos : traversalRecording[traversalRecording.length - 1];

			if (pos != undefined) {
				pos = getChildren(pos)[1];
				traversalRecording.pop();

				if (pos != undefined) {
					traversalRecording.push(pos);
				}
			}
		}
	}

	return queue;
}

function postTraverse() {
	var queue = [];
	var pos = document.getElementById('root');
	var traversalRecording = [];
	var nodeRecording = [];
	traversalRecording.push(pos);
	nodeRecording.push(0);

	while (traversalRecording.length > 0) {
		if (pos != undefined && nodeRecording[nodeRecording.length - 1] == 0) {
			pos = getChildren(pos)[0];
			traversalRecording.push(pos);
			nodeRecording.push(0);
			continue;
		} else if (nodeRecording[nodeRecording.length - 1] == 0) {
			if (pos == undefined) {
				nodeRecording.pop();
				traversalRecording.pop();
				pos = traversalRecording[traversalRecording.length - 1];
				nodeRecording.pop();
				nodeRecording.push(1);
				pos = getChildren(pos)[1];
				traversalRecording.push(pos);
				nodeRecording.push(0);
			}

			if (pos == undefined) {
				traversalRecording.pop();
				pos = traversalRecording[traversalRecording.length - 1];
				nodeRecording.pop();
			}

			continue;
		}

		if (nodeRecording[nodeRecording.length - 1] == 1) {
			queue.push(pos);
			nodeRecording.pop();
			traversalRecording.pop();
			pos = traversalRecording.length == 0 ? undefined : traversalRecording[traversalRecording.length - 1];

			if (traversalRecording.length != 0 && nodeRecording[nodeRecording.length - 1] == 0) {
				pos = traversalRecording[traversalRecording.length - 1];
				pos = getChildren(pos)[1];
				traversalRecording.push(pos);
				nodeRecording.pop();
				nodeRecording.push(1);
				nodeRecording.push(0);
			}
		}
	}

	return queue;
}

function inTraverse() {
	var queue = [];
	var pos = document.getElementById('root');
	var traversalRecording = [];
	traversalRecording.push(pos);

	while (traversalRecording.length > 0)
	{
		if (pos != undefined)
		{
			pos = getChildren(pos)[0];
			traversalRecording.push(pos);
			continue;
		} else {
			traversalRecording.pop();
			pos = traversalRecording.length == 0 ? pos : traversalRecording[traversalRecording.length - 1];
		}

		if (pos != undefined && pos == traversalRecording[traversalRecording.length - 1]) {
			queue.push(pos);
			traversalRecording.pop();
			pos = getChildren(pos)[1];
			traversalRecording.push(pos);
		}
	}

	return queue;
}

function getChildren(treeNode) {
	var childrenData = treeNode.childNodes;
	var children = [];

	for (var i = 0; i < childrenData.length; i++) {
		if (childrenData[i].className == "node")
		{
			children.push(childrenData[i]);
		}
	}

	return children;
}

function traverse(traverser) {
	var i = 1;
	traverser[0].style.backgroundColor = '#0000FF';
	var callback = function() {
		if (i < traverser.length) {
			traverser[i - 1].style.backgroundColor = '#FFFFFF';
			traverser[i].style.backgroundColor = '#0000FF';
			++i;
			setTimeout(callback, 1000);
		} else {
			console.log(i);
			traverser[i - 1].style.backgroundColor = '#FFFFFF';
		}
	};
	setTimeout(callback, 1000)
}

function clearAnimation() {
	var timeoutId = setTimeout(';');

	for (var i = 0; i < timeoutId; i++) {
		clearTimeout(i);
	}

	var nodes = document.getElementsByClassName('node');

	for (var i = 0; i < nodes.length; i++) {
		nodes[i].style.backgroundColor = '#FFFFFF';
	}
}