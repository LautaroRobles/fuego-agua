<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.5" tiledversion="1.7.2" name="objects" tilewidth="256" tileheight="128" tilecount="7" columns="0">
 <grid orientation="orthogonal" width="1" height="1"/>
 <tile id="0" type="box">
  <image width="128" height="128" source="objects/stone.png"/>
 </tile>
 <tile id="3" type="ball">
  <image width="64" height="64" source="objects/ball.png"/>
 </tile>
 <tile id="2" type="button">
  <properties>
   <property name="activates" type="int" value="0"/>
  </properties>
  <image width="128" height="32" source="objects/button.png"/>
 </tile>
 <tile id="6" type="lever">
  <properties>
   <property name="activates" type="int" value="0"/>
  </properties>
  <image width="128" height="128" source="objects/lever.png"/>
 </tile>
 <tile id="4" type="platform">
  <properties>
   <property name="activationID" type="int" value="0"/>
   <property name="color" type="color" value=""/>
   <property name="moveX" type="float" value="0"/>
   <property name="moveY" type="float" value="0"/>
   <property name="rotate" type="float" value="0"/>
   <property name="speed" type="float" value="1"/>
  </properties>
  <image width="256" height="64" source="objects/platform.png"/>
 </tile>
 <tile id="5" type="pendulum">
  <properties>
   <property name="swingHeight" type="float" value="256"/>
  </properties>
  <image width="256" height="32" source="objects/pendulum.png"/>
 </tile>
 <tile id="7" type="fan">
  <properties>
   <property name="activationID" type="int" value="0"/>
   <property name="color" type="color" value=""/>
   <property name="windLenght" type="float" value="0"/>
  </properties>
  <image width="192" height="64" source="objects/fan.png"/>
 </tile>
</tileset>
