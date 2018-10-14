import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import DropDown from "./DropDown";
import { withInfo } from "@storybook/addon-info";

const arr = {
  Honda: [
    "Activa",
    "CB Shine",
    "CB Unicorn",
    "Aviator",
    "Shine",
    "Unicorn",
    "Dio",
    "Dream Yuga",
    "CB Twister",
    "Activa I",
    "X-blqde",
    "Others"
  ],
  BAJAJ: [
    "Dominar 400",
    "Pulsar Rs200",
    "Pulsar Ns200",
    "Pulsar Ns160",
    "Pulsar 220f",
    "Pulsar 180",
    "Pulsar 150",
    "Avenger",
    "V",
    "Discover",
    "Platina",
    "Ct100"
  ],
  "Hero Motocorp": [
    "Xtreme 200r",
    "Karizma Zmr",
    "Xtreme Sports",
    "Achiever 150",
    "New Glamour",
    "Glqmour Programmed FI",
    "Super Splindor",
    "Glamour",
    "Duet",
    "Maestro Edge",
    "Passion X Pro",
    "New Super Splindor",
    "Passion Pro 110",
    "Splindor Ismart+",
    "Splendor Pro",
    "Splindor Plus",
    "Hf Deluxe Eco",
    "Hf Deluxe",
    "Hf Dawn"
  ],
  TVS: [
    "Apache Rr310",
    "Apache Rtr 160",
    "Apache Rtr 200",
    "Apache Rtr 180 Abs",
    "Tvs Victor",
    "Star City+",
    "Tvs Sport",
    "Tvs Ntorq",
    "Tvs Jupiter",
    "Tvs Wego",
    "Zest 110",
    "Scooty Pep+",
    "Others"
  ],
  Yamaha: [
    "Yzf R1",
    "Mt -09",
    "Yzf R15 V3 Moto Gp Edition",
    "Yzf R3",
    "Yzf R15 Ver 3.0",
    "Fazer -25",
    "Fz25",
    "Yzf R15s",
    "Fazer-fi",
    "Fzs-fi",
    "Fz-fi",
    "Sz-rr Ver 2.0",
    "Saluto 125",
    "Saluto Rx",
    "Rayzr Street Rally",
    "Fascino",
    "Rayzr",
    "Alpha",
    "Ray-z",
    "Scooter Boutique"
  ],
  "Royal Enfield": [
    "Bullet 500",
    "Bullet 350",
    "Bullet Es",
    "Classic Desert Storm",
    "Classic Chrome",
    "Classic Battle Green",
    "Classic 500",
    "Classic 350",
    "Classic Squadron Blue",
    "Explore Redditch Colors",
    "Explore Gunmetalgrey",
    "Explore Stealthblack",
    "Classic Pegasus Edition",
    "Classic 350 Signals",
    "Thunderbird 500",
    "Thunderbird 350",
    "Thunderbird X",
    "Contiental Gt",
    "Himalayan"
  ],
  Suzuki: [
    "Intruder",
    "Gixxer",
    "Gixxer Sp",
    "Gixxer Sf",
    "Gixxer Sp Sf",
    "Hayate Ep",
    "Bureman",
    "Access125",
    "Lets",
    "Gsx-s",
    "Rm-z 250",
    "Rm-z 450"
  ],
  Mahindra: [
    "Mahindra Mojo",
    "Mahindra Centuro",
    "Duro Dz",
    "Redeo Uzo",
    "Gusto"
  ],
  KTM: [
    "Ktm 200 Duke",
    "Ktm Rc200",
    "Ktm 390 Duke",
    "Ktm 250 Duke",
    "Ktm Rc390"
  ]
};
storiesOf("DropDown", module).addWithJSX(
  "Simple Use",
  withInfo("Button")(() => {
    const state = false;

    return <DropDown items={arr} />;
  })
);
