##Application
API'S Used

    Cat: https://aws.random.cat/meow
    Dog: https://random.dog/woof.json 
    Fox: https://randomfox.ca/floof/ //not used due to cross-origin restriction.
Note: Api `https://randomfox.ca/floof/` is not included in this project. It has CORS issue as cross-origin is not enabled for this api. 

Note: These apis return video as well along with images.
By default, I have ignored the video files. In case if you need to include videos as well in the search results, you can enable this by adding property `showVideo={true}` or `showVideo="true"` to `<ImageWrapper />` component in `App.js` file.
Like shown here:
`<ImageWrapper imagesArray={imagesArray} showVideo={true}/>`
<br /><br />
#### Clone this project `git clone {repo path}`

#### I have checked in the production build as well. To run the production version, in the project directory, run:
#####` npx http-server ./build/`
##### Open [http://localhost:8080](http://localhost:8080) to view it in the browser.
<br /><br />
#### To run in development mode, in the project directory, run:
#####`yarn start` or `npm start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br />
You will also see any lint errors in the console.