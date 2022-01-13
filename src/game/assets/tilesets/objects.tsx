<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.5" tiledversion="1.7.2" name="objects" tilewidth="256" tileheight="128" tilecount="4" columns="0">
 <grid orientation="orthogonal" width="1" height="1"/>
 <tile id="0" type="box">
  <image width="128" height="128" source="objects/stone.png"/>
 </tile>
 <tile id="2" type="button">
  <properties>
   <property name="activates" type="int" value="0"/>
  </properties>
  <image width="128" height="32" source="objects/button.png"/>
 </tile>
 <tile id="3" type="ball">
  <image width="64" height="64" source="objects/ball.png"/>
 </tile>
 <tile id="4" type="platform">
  <properties>
   <property name="activationID" type="int" value="0"/>
   <property name="color" type="color" value=""/>
   <property name="moveX" type="float" value="0"/>
   <property name="moveY" type="float" value="0"/>
   <property name="rotate" type="float" value="0"/>
  </properties>
  <image width="256" height="64" source="objects/platform.png"/>
 </tile>
</tileset>