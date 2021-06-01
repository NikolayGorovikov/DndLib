# DndLib

Drag-n-Drop for human beings

## The drop begins

You can turn on drag-n-drop by adding `data-dnd` attribute:

```html
<div data-dnd>
    Some text
</div>
```

When you start dragging the element, you can change it's style with `data-dnd-styleBegin` attribute.

Use `(change)` in the beginning of this attribute's value to replace the element's CSS.

```html
<div data-dnd data-dnd-styleBegin="(change) color: red;">
    Some text
</div>
```

You can also provide a callback function that has a global scope visibility:

```html
<div data-dnd data-dnd-doBegin="console.log('Roses are red, violets are blue...')">
    Some text
</div>
```

This function may take 2 additional arguments: `dragElem` and `target`.

`dragElem` - DOM element being dragged

`target` - array of DOM elements specified in `dnd-target`

## Direction of moving

Attributes `data-dnd-PreventXDirection` & `data-dnd-PreventYDirection` can be used to make the element move only in one direction.

```html
<div data-dnd data-dnd-PreventXDirection>
    This element can be moved only in Y direction
</div>
```

## Targets

You can specify targets' IDs (separated with spaces) where element can be dropped with adding `data-dnd-target` attribute.

```html
<div data-dnd data-dnd-target="target1 target2">
    Some text
</div>
```

## Taking the element

To prevent the element moving from it's original position on drag,
you can use `data-dnd-clone` attribute. It creates a copy of the element that isn't visible.

To add some specific styles to this clone you should use
`data-dnd-cloneBegin` attribute.

You can always access the clone with `dragElem._system.clone` if
you'd wish to.

`data-dnd-cloneend` is used to delete the clone after drag-n-drop.

By default the element's position is set to absolute, so `width`, `height`, `box-sizing` & `border-box` are set to absolute. You can change it with `data-dnd-doSetAbsolute` (callback function is similiar to data-dnd-doBegin).

##  Moving the element

Then we move the element we can also do something with it. We can add a function attribute called data-dnd-onMove to the dnd element so then it will have dragElem = dnd element and target = array of all the dnd element targets. Or we can add this attribute to the the targets then dragElem = dnd element and target = the target we addded it to. This function will be done every time we move uor element, so you can check its speed or make a fire way. But also it is possible that we hover in our element to one of the targets, and here we ussualy want to gu=ive a signal to the user that he can drop it there, and we give you a comfortable way to do it. At first we can add an attribute data-dnd-hoverBehavior on our dnd element, this attribute lets us to manage how do we understand if out dnd element is being into the target so the user can drop it. There are 2 possible variants, it could be "center", then we will check the center point of the element, if it is inside or not, "mouse" - we check the mouse position. Also if you would like to add your own way to check for hovering you have to use our special object called DND, here you have to use method "annHoverBehaviour", there you have to give two parametres, the first one is function that have to return an array that consists the x and y cords, [x,y], also we will give two arguments to your funvtion, the first one is event object, it is a regular pointerMove event object, and the second argument is a dnd element that is being moving. The second parametr of addhoverBehaviour is the name you give to your costum hover behaviour, it can me any one (yes, even "**proto**") except the reserved names, they are "center" and "mouse".After you have setted your hoverBehaviour you can use it in attribute data-dnd-hoverBehaviour. The little live hack for you: you actually can change the behaviour if hoverBehaviour is unsetted, if you dont chanfe it it woald be "center", but you can change it to any function you want, just giving to your hoverBehaviour a name undefined. Alright, we have hover behaviour, and now we can do something then a user goes into the target, so let me introduce you some attributes wich gives us this apportunity. data-dnd-DoHoverIn is a function that will be made then a user hovers a dnd element into one of the targets. This function gets dragElem - the dnd element and target - the the target wich has been hovered. If we give this attribute to the target it will act the same way, but the function will be made only then user hovers the trget we added it to. Also we have data-dnd-HoverInStyle, it works the same but with styles. Also we have a situation then a user hovers out the element, so we have a special attribute here too. It callls data-dnd-doHoverOut for a function, it works the same as data-dnd-dohoverind and data-dnd-hoveroutstyles, it wirks analogical the data-dnd-hoverinstyles.

## Dropping the element

Here our user drops the dnd element, so we have to do something with it, if it was into a target we have to do une think, if it wasnt - anouther, and here is wery easy to manage it. At first, lets see what can we do in any way, sometimes we have to give some animation or styles or something else and it doesnt matter are we into the target or not. So here we have an attribute called data-dnd-doanywaybefore, we have to out there a function that will be done in any case before other functions(you will see them later), if you give this attribute to dnd element it has dragElem - dnd element and target - the array with all targets, if you gevi this attribute to the target it would have dragElem - the dnd element, and target is the current target. Also you have to know that you can get the you can get hoverTrgat, i mean a target that is hovered by user right now, you can use a dnd element property "hoverItem", so you can get a target that is hovered in any place of code you want, but pay attention at that it ciuld ba undefined then there is no hovered target. The next attributes tets us do sumething and give styles then it was a success drag-n-drop, so a user dropped a dnd element on one of the targets. data-dnd-dosuccess - the function attribute, this function will be done on the dnd element and target where a dnd element was delivered, in both wariants the dragElem - dnd element, and the target is dragElem.hoverItem, the same way we can add styles to the successfull targett or dnd element, data-dnd-successstyle, it is a style attribute and it gives a style to its owner then it was a successfull drag-n-drop on thet element. Analogical there is a data-dnd-donotsuccess a function attribute that will be done then a drag-n-drop wasnt successfull, on the element wich ownes that attribute or the dnd element if this attribute is on it, You have to understand that if yiu have few targets and it was a successful dnd, so lets imagine that a user has moved the dnd-element into a targrt1, so the target1 will be done data-dnd-dosuccess and data-dnd-sucessstyle, but on other target will be done data-dnd-donotsucess and data-dnd-notsuccessstyle, because the dnd wasnt successful for it. data-dnd-notsuccessstyle is style attribute that has got style wich will be added in not successful dnd. The last thing we can do is data-dnd-doanywayafter, so this is a function attribute and its function will be done tin any case after all functions i have told about previously, we can add it to tha targets or the dnd element, the arguments are the same as in the data-dnd-doynywaybefore. 5. Some extra info

## DND.end

Every dnd has its own end, under the word end i mean a moment then it is finished and a user can grab the dnd element again, sometimes the end becomes then a user drops a dnd element, but if have some animation of moving an element to his start position, and while moving a user will grab it again, and your code reads a start coordinates to move it back, so now the first coordinates will not be correct, or if you make your dnd element smaller, usingv a transform, then a user will grab the dnd element while it is getting his normal size the library will fix the size of your element and it will not be correct, so i think you understad that we realy need to have a dnd end sometimes later than dropping, you can easily do it. You know the DND object and it also has got a second method called "end", it gets one param, the dnd element you want to end dnd. And also there is an attribute that prevents behaviour that makes a dnd end right after dropping the dnd element, it calles data-dnd-endprevention, if your dnd element has this attribute the DND.end(dragElem) will not ba done untill you do it by your own code, lets see what does DND.end does excactly. At first it lets a user to grab the dnd element, before this function was done a user cant grab this element(i mean after a dnd), also here a clone will be removed it a dnd element has got a data-dnd-cloneend attribute, and also you have to know that while dnd your library prevents any selection, because it woald realy unconfortable for a user to see him selection a lot of text just trying to move an element somewhere, but if you want to let the user to select while dnd, you can use the attribute data-dnd-copy, it will let the user to copy while dnd. And in the DND.end function we let the user to select , because the dnd is ended.

## Out the screen

Some times a user can move a dnd element out the visible part of document, and here we have to do something with it, by the default it woauld act like a user has dropped the dnd element, everything would be like user just dropped the element next to the end of visible document part, but if you are not agree with this you can do something by tour own function, in function attribute called `data-dnd-outTheWindow`, here the dragElem is dnd element and target is an array with all the targets. 6. Parent function and style attributes
Wery oftern we can have lots of dnd element or targets in one parent wich act the same, and here we dont have to write the same style and function attributes, we can just write them into their parent and then it would work the same, but pay atttention that if you woald add to some dnd element a style attribute(or a function attribute), it would be more priotity then a parent attribute, event if it is empty. The rule i have described works only with style and function attributes, all anouther atttributes you have to write into a target or a dnd element.

Thanks for reading this, hope that library would help you!
