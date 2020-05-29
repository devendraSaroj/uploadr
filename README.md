
## Visit the site

https://devendrasaroj.github.io/uploadr

### Pages

Select image page<br />
Crop page<br />
Album page


### `Select image page`

User can select an image file, and then page extracts the iformation out of that image, e.g. name, resolution and size of the image and displays the same.<br />
Once image selected, user can click on "Proceed" button at the bottom and it will run a short check if image's resolution is of 1024x1-24 or not. <br />
If not 1024x1024 It will show an alert saying "image must be 1024x1024". <br />
It also runs the check for whether any image file is selected or it is null.
### `Crop page`
Crops the image in 4 different resolution: <br />
horizontal : 755 x 450 <br />
vertical : 365 x 450 <br />
horizontal small : 365 x 212 <br />
gallery : 380 x 380 <br />
It provides the user with 4 different `cropper` with their corresponding `preview area`.<br />
With the help of preview user can have an idea about the output image that the cropper will produce in the end. <br />
Each cropper crops for the different `image resolution` that can be seen below preview area.<br />
And then it upload all 4 cropped images to the cloud on clicking `Upload All` button

### `Upload image page`

It fetches all the uploaded images and list them by grouping the cropped images from same image file. <br />
Images are shown in the most recent order. Meaning that the most recenty uploaded images will be shown on the top. 


### `Tech stack used`
**ReactJS** - for the frontend design
**Redux** - for the global state management 
**Firebase** storage - for saving the image to the cloud
**Firebase firestore Real time database** - for storing the data about image
