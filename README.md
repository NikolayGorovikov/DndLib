# DndLib
Library for Drag-n-drop
0. Main concepts
Style attribute - attribute there you have to write style for the element with the regular syntax and you also can use a word (change), then the style will change the style attribute of the element, if you dont write (change) there, styles will be just added Example: data-dnd-styleBegin="(change) color: red;"
Function attribute - attribute where you have to write a function wich will be done in some moment, it has a global scope visibility and takes some arguments, about them you would know later, Example: data-dnd-doBegin="console.log('Function from the attribute')" 
This library is made to make the drag-n-drop tecnology easier in its usage.
1.Lets begin
The first step you should do to make an element draggable is give it an attribute data-dnd. By the way all the attributes we have in this lib
always starts with data, it make us be calm about its usage and we always know that they cant be used for somethink else. Then you gave your element data-dnd it gets an ability to be moved in any place you want you grab it and move, this attribute is nesssesary so you would not be able to you other attributes from this lib on the element if it doesent have data-dnd. If you try to remove data-dnd while moving nothink will happen but the next try to move the element after pressing up will be not successful, if you want to immediatle finish drag-n-drop there is a better way to do it, we will tell about it 
2.X and Y direction
If you want to make the element move only in one direction, it could be x or y, you have to give to the element an attribute data-dnd-PreventXDirection for only Y movung or data-dnd-PreventYDirection for only x. If you give it both it would be impossible to move the element. If you would try to change one of this attributes while moing the element it will stop moving if it could or if couldnt it will bwgin, but here you have to be carefull because it will move to the mouse position and take a position as like as it was able to move in prevented direction. 
3.Tragets of moving
Usually we dont move the element with no source so we have a target or a few. If your element has a dnd target you have to giv it an attribute data-dnd-target and there you have to write id of one or few target elems, Example: data-dnd-target="target1 target2". But now actually nothink has changed for us. To use averythink that data-dnd-target gives us we have to know some other staff
4. Cycle of drag element
At first lets divide our drag process for 3 parts: taking the element(when we grab it), moving the element, drop the element
4.1 Taking the element
This is a first part of drag-n-drop, and here there is somethink to do. At first there is an attribute wich gives some styles to the dnd element then you grab it, it calls data-dnd-styleBegin, it is a style attribute and all the styles will be added to the dnd elem right then a user grab it, also we can giv this attribute to targets, it will work the same. The next attribute is data-dnd-doBegin, this attribute is a function attribute and the function in it will be done then a user grabs a dnd elem. If you add data-dnd-doBegin to the dnd elem the function will take 2 arguments, dragElem - the dnd element and target - the Array wich has all the dnd elem targets, so you can do sometink with them. If you add data-dnd-doBegin to one of the targets it will have two arguments, dragElem - the dnd element, target - the target(the element target where you have added data-dnd-doBegin). Okay, you gave your targets and dnd element some of this attributes, and here could be one problem: what if you dnd element was in the flex block, so then it gets absolute position other elemtnts in his flex container will be moved, ussualy we dont need it, so there is a way how to solve this problem. You have to add an attribute data-dnd-clone to the dnd element and now, then our element will be grabed and take the absolute position clone element will be added before dnd element, the clone is the same as dnd element but it has visibility hidden and doesn have an attribute data-dnd. Here if you want to change some styles of the clone you can can give a dnd element an attribute data-dnd-cloneBegin, here you can write styles wich will be given to the clone after it will be added to DOM. If you want to give a clone spicial class of an attribute or something else yoou can take the clone element from dragElem._system.clone. Also you can manage a behaviour of the clone after an end of dnd, if you give dnd element a data-dnd-cloneend the clone will be automaticaly deleted after the dnd, else it will not deleted, if there is ine clone other clone will not be added to the DOM.The next problem you can have is that position of the dnd element becomes absolute. Everything we change in grabbing element parse is element style is: width, height, box-sozing to border-box position absolute and left/top(we also remove right and bottom). If is not that you want you can immediatly cange it, using the attribute data-dnd-doSetAbsolute, it is a function attribute and dragElem = dnd element, target = Array of all the dragElem targets. This is all with the first part.
4.2 Moving the element
Then we move the element we can also do something with it. We can add a function attribute called data-dnd-onMove to the dnd element so then it will have dragElem = dnd element and target = array of all the dnd element targets. Or we can add this attribute to the the targets then dragElem = dnd element and target = the target we addded it to. This function will be done every time we move uor element, so you can check its speed or make a fire way. But also it is possible that we hover in our element to one of the targets, and here we ussualy want to gu=ive a signal to the user that he can drop it there, and we give you a comfortable way to do it. At first we can add an attribute ... 














