let myDiagram;

export function fillSubSites(sites, structureWidth, diagram) {
    //sites.shift();
    var excluded = ["Master Page Gallery", "Calendar", "Content and Structure Reports", "Form Templates",
        "Links", "MicroFeed", "Tasks", "Reusable Content", "Workflow History", "Site Collection Documents", "Site Assets",
        "Site Collection Images", "Announcements", "Site Pages", "Style Library", "Workflow Tasks", "Site Library"];
    var nodeData = [];
    var mainList
    var parent;
    var legend = []
    var maxChildren = findMaxChildren(sites);
    //var levelColors = ["#2AD2C9","#00B388","#FF8D6D","#425563","#617D78","#878787","#614767",'#C6C9CA'];
    var levelColors = ["#FFED00", "#000000", "#666666", "#D9D9D9", "#00C9FF", "#64FF00"];
    var newColors = [];
    var textColors = ["#000000", "#FFFFFF", "#FFFFFF", "#000000", "#000000", "#FFFFFF"];
    var newTextColors = [];
    for (var i = 0; i <= maxChildren + 2; i++) {
        legend.push(
            {
                key: i + 1,
                name: 'Level' + ' ' + parseInt(i + 1),
                textC: textColors[parseInt(i)],
                parent: i
            })
        if (i == maxChildren + 2) {
            newColors.push(levelColors[levelColors.length - 1])
        } else {
            newColors.push(levelColors[i]);
        }
        if (i == maxChildren + 2) {
            newTextColors.push(textColors[textColors.length - 1])
        } else {
            newTextColors.push(textColors[i]);
        }
    }
    for (var i = 0; i < legend.length; i++) {
        nodeData.push(legend[i]);
    }
    nodeData.push({
        key: sites[0].head,
        name: sites[0].realName,
        textC: "#000000",
        type: 'Main'
    })
    var mainLists = {
        name: "",
        parent: sites[0].head,
        type: 'Lists'
    };
    for (var i = 0; i < sites[0].lists.length; i++) {
        if (excluded.indexOf(sites[0].lists[i].name) == -1) {
            mainLists.name += sites[0].lists[i].name.replace(/&amp;/g, '&') + '\n';
        }
    }
    nodeData.push(mainLists);
    for (var i = 1; i < sites.length; i++) {
        if (sites[i].parents.length == 0) {
            nodeData.push({
                key: sites[i].title,
                name: sites[i].realName.replace(/&amp;/g, '&'),
                parent: sites[0].head,
                textC: "#FFFFFF",
                type: 'BeforeLists'
            })
        } else {
            nodeData.push(
                {
                    key: sites[i].parentsURL[sites[i].parentsURL.length - 1] + '/' + sites[i].title,
                    name: sites[i].realName.replace(/&amp;/g, '&'),
                    parent: sites[i].parentsURL[sites[i].parentsURL.length - 1],
                    textC: textColors[sites[i].parentsURL.length + 1],
                    type: 'BeforeLists'
                }
            )
        }
        if (sites[i].lists.length > 0) {
            var obj = {
                key: '',
                name: '\n',
                type: 'Lists'
            }
            var name = '';
            for (var j = 0; j < sites[i].lists.length; j++) {
                if (excluded.indexOf(sites[i].lists[j].name) == -1) {
                    name += sites[i].lists[j].name.replace(/&amp;/g, '&') + '\n';
                }
            }
            obj.name = name;
            if (sites[i].parents.length == 0) {
                obj.parent = sites[i].title || sites[i].head;
            } else {
                if (sites[i].parentsURL.length > 0) {
                    obj.parent = sites[i].parentsURL[sites[i].parentsURL.length - 1] + '/' + sites[i].title;
                } else {
                    obj.parent = sites[i].head || sites[i].title;
                }
            }


            nodeData.push(obj);
            // }
        }
    }

    draw(nodeData, newColors, newTextColors, structureWidth, diagram);
    //shape.minSize = new go.Size(shape.Hc.width+2,shape.Hc.height+1);
}

export function draw(data, setColors, textColors, structureWidth, diagram) {
    var host;
    var sizes = [];
    var sizesSecond = [];
    var altAlign;
    if (structureWidth == 'Compact') {
        altAlign = go.TreeLayout.AlignmentBus;
    } else {
        altAlign = go.TreeLayout.AlignmentCenterChildren
    }
    var $ = go.GraphObject.make;
    myDiagram =
        $(go.Diagram, diagram,
            {
                initialContentAlignment: go.Spot.Center, // center Diagram contents
                "undoManager.isEnabled": true,
                "draggingTool.dragsTree": true,
                "commandHandler.deletesTree": true,
                maxSelectionCount: 1000,
                layout:
                    $(go.TreeLayout,
                        {
                            treeStyle: go.TreeLayout.StyleRootOnly,
                            arrangement: go.TreeLayout.ArrangementHorizontal,
                            // properties for most of the tree:
                            angle: 90,
                            // layerSpacing: 60,
                            alignment: go.TreeLayout.AlignmentCenterChildren,
                            // properties for the "last parents":
                            alternateAngle: 90,
                            alternateLayerSpacing: 20,
                            //alternateNodeSpacing: 5,
                            // alternateBreadthLimit: 5,
                            alternateRowSpacing: 2,
                            //alternateLayerSpacing: 20,
                            alternateAlignment: altAlign,//Bus
                            breadthLimit: structureWidth * 500,
                        }
                    )

            });

    myDiagram.nodeTemplate =
        $(go.Node, "Auto", { resizable: true, },

            $(go.Shape, "RoundedRectangle",
                {
                    name: "SHAPE", fill: "white", stroke: null,
                    // set the port properties:
                    portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer",
                    fromSpot: go.Spot.Left
                }),
            $(go.TextBlock,
                {
                    margin: 5, stroke: "white", font: "bold 12px Arial",
                    editable: true, textAlign: 'left'
                },
                new go.Binding("text", "name"),
                new go.Binding("stroke", "textC"))
        );

    myDiagram.linkTemplate =
        $(go.Link,
            { routing: go.Link.AvoidsNodes, corner: 5, curve: go.Link.JumpOver, reshapable: true, resegmentable: true, relinkableFrom: true, relinkableTo: true },
            $(go.Shape, { strokeWidth: 2, stroke: "#555", fill: 'white', name: 'SHAPE' }));
    myDiagram.layout.commitNodes = function () {
        go.TreeLayout.prototype.commitNodes.call(myDiagram.layout);  // do the standard behavior
        // then go through all of the vertexes and set their corresponding node's Shape.fill
        // to a brush dependent on the TreeVertex.level value
        myDiagram.layout.network.vertexes.each(function (v) {
            if (v.node.rh.type == 'Lists' && v.node.rh.name !== "") {
                host = v.node.Hc
                sizes.push(
                    {
                        parent: v.node.rh.parent,
                        width: host.width,
                        height: host.height,
                        centerX: host.centerX,
                        centerY: host.centerY
                    })
            }
            else if (v.node.rh.type == 'BeforeLists') {
                host = v.node.Hc
                sizesSecond.push(
                    {
                        key: v.node.rh.key,
                        width: host.width,
                        height: host.height,
                        centerX: host.centerX,
                        centerY: host.centerY
                    })
            }
        })
        myDiagram.layout.network.vertexes.each(function (v) {
            let shape;
            let text;
            var colors;
            if (v.node) {

                var level = v.level % (setColors.length);
                var levelText = v.level % (textColors.length);
                colors = setColors[level];
                var textColorsArray = textColors[levelText];
                if (v.node.rh.type == 'Lists') {
                    colors = "#C6C9CA";
                    for (var i = 0; i < sizesSecond.length; i++) {
                        shape = v.node.findObject("SHAPE");
                        if (sizesSecond[i].key == v.node.rh.parent) {
                            shape.minSize = new go.Size(sizesSecond[i].width, v.node.Hc.height);
                        }
                    }
                }
                else if (v.node.rh.type == 'BeforeLists') {

                    for (var i = 0; i < sizes.length; i++) {
                        shape = v.node.findObject("SHAPE");
                        if (sizes[i].parent == v.node.rh.key) {
                            shape.minSize = new go.Size(sizes[i].width, 50);

                        }
                    }

                }
                if (colors === undefined) {
                    colors = '#FFED00';
                };

                shape = v.node.findObject("SHAPE");
                text = v.node.findObject("TextBlock");
                var test = '#5bad2e';

                if (shape) shape.fill = $(go.Brush, "Linear", { 0: colors, 1: colors, start: go.Spot.Left, end: go.Spot.Right });
                if (text) text.stroke = $(go.TextBlock, { stroke: textColorsArray });
                shape.minSize = new go.Size(shape.Hc.width, shape.Hc.height + 10);

            }

        });
    }
    // define a Link template that routes orthogonally, with no arrowhead
    // the link shape

    var model = $(go.TreeModel);
    model.nodeDataArray = data;
    myDiagram.model = model;
}

function findMaxChildren(subSites) {
    var flag = 0;
    for (var i = 0; i < subSites.length; i++) {
        if (subSites[i].children > flag) {
            flag = subSites[i].children
        }
    }
    return flag;
}

export function filterData(data, filter) {
    var filtered = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].url.indexOf(filter) > -1 || filter == '') {
            filtered.push(data[i]);
        }
    }
    return filtered;
};

export function exportToPng() {

    var svg = myDiagram.makeImage({
        scale: 1,
        type: "image/png",
        background: "rgb(255,255,255)",
        maxSize: new go.Size(10000, 10000)
    });
    return svg;

}


