Instructions
============

Issue: [Field Papers](http://fieldpapers.org) in June 2017 will not accept Mapbox Studio tiles. This proxy works around the issue, allowing you to compose a semi-dynamic map using it.

Instructions
============

For guidance visit: https://fieldpapers-mapboxstudio-proxy.herokuapp.com/
![image](https://user-images.githubusercontent.com/283343/30034776-98ee776a-9171-11e7-91d8-7be853716838.png)


Convert your Mapbox Studio address:

If your style address is:
mapbox://styles/mapbox/outdoors-v10

It should look like this:

`https://fieldpapers-mapboxstudio-proxy.herokuapp.com/v10/mapbox.outdoors-v10/{Z}/{X}/{Y}.png?access_token=`**PUT.REAL.TOKEN.HERE**

**It must not have `@2x` in the address. It must have .png or .jpg in the address. It must have an access_token.**

Then go to the Field Papers custom creator and put the address you just made in as an atlas provider:

http://fieldpapers.org/make-canned-atlas-template

It should appear in the atlas list as "User provided"
