import gql from 'graphql-tag';
import React from 'react';
import { Subscription } from 'react-apollo';

const getFloorFill = (data) => {
  const defaultColor = '#FFFFFF';
  const errorColor = '#B42E2E';

  if (data) {
    if (data.speakerStatusChanged.coreid === '2a0026001447353236343033') {
      return data.speakerStatusChanged.data === 'RED' ? errorColor : defaultColor;
    }
  }

  return defaultColor;
};

const onTempChanged = gql`
  subscription onTempChanged {
    roomTempChanged {
      coreid
      data {
        dhtTemperature
      }
    }
  }
`;

const onSpeakerStatusChange = gql`
  subscription onSpeakerStatusChange {
    speakerStatusChanged(roomId: 0) {
      coreid
      data
    }
  }
`;

const FloorMap = props => (
  <svg width="1302px" height="1552px" viewBox="0 0 1302 1552">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="Kalahari-TC-Map">
        <g id="Hallways" transform="translate(39.000000, 9.000000)" fill="#D8D8D8">
          <path d="M965,779 L965,1193 L963,1193 L963,1229 L596,1229 L596,1403 L706,1403 L706,1440 L0,1440 L0,1403 L513,1403 L513,882 L494,882 L494,631 L471,631 L471,96 L594,96 L594,600 L919,600 L919,0 L979,0 L979,583 L1259,583 L1259,662 L987,662 L987,778 L979,778 L979,779 L965,779 Z M920,779 L919,779 L919,647 L594,647 L594,879 L596,879 L596,1189 L920,1189 L920,779 Z" id="Combined-Shape" />
        </g>
        <g id="Walls" transform="translate(39.000000, 9.000000)" fill="#000000">
          <rect id="Ironwood-Walls" x="364" y="1440" width="160" height="55" />
          <path d="M709,1453 L727,1453 L727,1531 L550,1531 L550,1453 L550,1440 L709,1440 L709,1453 Z" id="Banyan-Walls" />
          <path d="M597,1229 L792,1229 L792,1341 L596,1341 L596,1319 L580,1319 L580,1229 L597,1229 Z" id="Cypress-Walls" />
          <rect id="Rectangle-13" x="594" y="646" width="326" height="545" />
          <rect id="Rectangle-8" x="963" y="777" width="134" height="412" />
          <rect id="Rectangle" x="976" y="89" width="128" height="511" />
          <rect id="Rectangle-34" x="0" y="1295" width="522" height="109" />
          <path d="M967,1229 L967,1233 L787,1233 L787,1229 L963,1229 L963,1189 L967,1189 L967,1229 Z" id="Combined-Shape" />
          <rect id="Rectangle-48" x="524" y="1440" width="27" height="4" />
          <rect id="Rectangle-49" x="705" y="1399" width="4" height="42" />
          <rect id="Rectangle-50" x="682" y="1399" width="27" height="4" />
          <rect id="Rectangle-51" x="678" y="1340" width="4" height="63" />
          <rect id="Rectangle-52" x="0" y="1440" width="364" height="4" />
          <rect id="Rectangle-59" x="509" y="1231" width="4" height="64" />
          <rect id="Rectangle-61" x="490" y="882" width="19" height="4" />
          <rect id="Rectangle-62" x="490" y="802" width="4" height="80" />
          <rect id="Rectangle-63" x="490" y="631" width="4" height="83" />
          <rect id="Rectangle-65" x="467" y="92" width="4" height="539" />
          <rect id="Rectangle-66" x="471" y="92" width="40" height="4" />
          <rect id="Rectangle-60" x="509" y="882" width="4" height="303" />
          <rect id="Rectangle-64" x="467" y="631" width="23" height="4" />
          <rect id="Rectangle-57" x="922" y="0" width="58" height="4" />
          <rect id="Rectangle-58" x="976" y="4" width="4" height="85" />
          <rect id="Rectangle-67" x="1104" y="579" width="155" height="4" />
          <path d="M1103,655 L1103,778 L984,778 L984,655 L1005,655 L1005,647 L1044,647 L1044,655 L1062,655 L1062,647 L1103,647 L1103,655 Z" id="Empress-and-Ebony" />
        </g>
        <g id="Mess-Hall-and-Keynotes" transform="translate(633.000000, 9.000000)">
          <rect id="Rectangle-44" fill="#000000" x="0" y="0" width="328" height="600" />
          <rect id="Rectangle-45" fill="#FFFFFF" x="4" y="4" width="320" height="592" />
        </g>
        <g id="Empress-Room" transform="translate(1026.000000, 659.000000)">
          <path d="M21,8 L21,0 L54,0 L54,8 L54,124 L0,124 L0,8 L21,8 Z" id="Empress-Floor" fill="#FFFFFF" />
          <text id="Empress-Name" transform="translate(26.500000, 66.000000) rotate(-90.000000) translate(-26.500000, -66.000000) " font-family="Arial-BoldMT, Arial" font-size="17" font-weight="bold" fill="#000000">
            <tspan x="-9.40917969" y="71.5">Empress</tspan>
          </text>
        </g>
        <g id="Ebony-Room" transform="translate(1084.000000, 659.000000)">
          <path d="M21,8 L21,0 L54,0 L54,8 L54,124 L0,124 L0,8 L21,8 Z" id="Ebony-Floor" fill="#FFFFFF" />
          <text id="Ebony-Name" transform="translate(27.500000, 69.500000) rotate(-90.000000) translate(-27.500000, -69.500000) " font-family="Arial-BoldMT, Arial" font-size="17" font-weight="bold" fill="#000000">
            <tspan x="1.52685547" y="75">Ebony</tspan>
          </text>
        </g>
        <g id="CrownPalm-Room" transform="translate(409.000000, 1307.000000)">
          <path d="M54,102 L0,102 L0,0 L149,0 L149,102 L75,102 L75,107 L54,107 L54,102 Z" id="CrownPalm-Floor" fill="#FFFFFF" />
          <text id="CrownPalm-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="54.2148438" y="72">Temp</tspan>
          </text>
          <text id="CrownPalm-Name" font-family="Arial-BoldMT, Arial" font-size="17" font-weight="bold" fill="#000000">
            <tspan x="25.380127" y="47">Crown Palm</tspan>
          </text>
        </g>
        <g id="Acacia-Room" transform="translate(44.000000, 1307.000000)">
          <path d="M86,101.65 L86,107 L65,107 L65,101.65 L0,101.65 L0,0 L159,0 L159,101.65 L86,101.65 Z" id="Acacia-Floor" fill="#FFFFFF" />
          <text id="Acacia-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="59.2148438" y="73">Temp</tspan>
          </text>
          <text id="Acacia-Name" font-family="Arial-BoldMT, Arial" font-size="17" font-weight="bold" fill="#000000">
            <tspan x="52.0908203" y="48">Acacia</tspan>
          </text>
        </g>
        <g id="Bamboo-Room" transform="translate(207.000000, 1307.000000)">
          <path d="M101,102 L101,107 L80,107 L80,102 L0,102 L0,0 L198,0 L198,102 L101,102 Z" id="Bamboo-Floor" fill="#FFFFFF" />
          <text id="Bamboo-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="77.2148438" y="73">Temp</tspan>
          </text>
          <text id="Bamboo-Name" font-family="Arial-BoldMT, Arial" font-size="17" font-weight="bold" fill="#000000">
            <tspan x="66.5" y="48">Bamboo</tspan>
          </text>
        </g>
        <g id="Banyan-Room" transform="translate(593.000000, 1449.000000)">
          <path d="M24,4 L151,4 L151,17 L169,17 L169,87 L0,87 L0,17 L0,4 L3,4 L3,0 L24,0 L24,4 Z" id="Banyan-Floor" fill="#FFFFFF" />
          <text id="Banyan-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="64.2148438" y="66">Temp</tspan>
          </text>
          <text id="Banyan-Name" font-family="Arial-BoldMT, Arial" font-size="17" font-weight="bold" fill="#000000">
            <tspan x="55.7954102" y="41">Banyan</tspan>
          </text>
        </g>
        <g id="Ironwood-Room" transform="translate(407.000000, 1449.000000)">
          <path d="M126,4 L126,0 L147,0 L147,4 L152,4 L152,51 L0,51 L0,4 L126,4 Z" id="Ironwood-Floor" fill="#FFFFFF" />
          <text id="Ironwood-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="56.2148438" y="45">Temp</tspan>
          </text>
          <text id="Ironwood-Name" font-family="Arial-BoldMT, Arial" font-size="17" font-weight="bold" fill="#000000">
            <tspan x="38.2583008" y="24">Ironwood</tspan>
          </text>
        </g>
        <g id="Cypress-Room" transform="translate(623.000000, 1242.000000)">
          <path d="M15,0 L204,0 L204,104 L15,104 L15,82 L0,82 L0,0 L15,0 Z" id="Cypress-Floor" fill="#FFFFFF" />
          <text id="Cypress-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="86.7148438" y="68">Temp</tspan>
          </text>
          <text id="Cypress-Name" font-family="Arial-BoldMT, Arial" font-size="17" font-weight="bold" fill="#000000">
            <tspan x="74.4523926" y="43">Cypress</tspan>
          </text>
        </g>
        <g id="G-Room" transform="translate(799.000000, 831.000000)">
          <path d="M156,33 L160,33 L160,54 L156,54 L156,119 L0,119 L0,0 L156,0 L156,33 Z" id="G-Floor" fill="#FFFFFF" />
          <text id="G-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="55.7148438" y="89">Temp</tspan>
          </text>
          <text id="G-Name" font-family="Arial-BoldMT, Arial" font-size="24" font-weight="bold" fill="#000000">
            <tspan x="67.1660156" y="61">G</tspan>
          </text>
        </g>
        <g id="F-Room" transform="translate(799.000000, 954.000000)">
          <path d="M156,32 L160,32 L160,53 L156,53 L156,119 L0,119 L0,0 L156,0 L156,32 Z" id="F-Floor" fill="#FFFFFF" />
          <text id="F-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="58.7148438" y="89">Temp</tspan>
          </text>
          <text id="F-Name" font-family="Arial-BoldMT, Arial" font-size="24" font-weight="bold" fill="#000000">
            <tspan x="69.1699219" y="58">F</tspan>
          </text>
        </g>
        <g id="E-Room" transform="translate(799.000000, 1077.000000)">
          <path d="M156,32 L160,32 L160,53 L156,53 L156,119 L0,119 L0,0 L156,0 L156,32 Z" id="E-Floor" fill="#FFFFFF" />
          <text id="E-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="56.2148438" y="83">Temp</tspan>
          </text>
          <text id="E-Name" font-family="Arial-BoldMT, Arial" font-size="24" font-weight="bold" fill="#000000">
            <tspan x="68.4960938" y="55">E</tspan>
          </text>
        </g>
        <g id="D-Room" transform="translate(633.000000, 1077.000000)">
          <path d="M5,53 L0,53 L0,32 L5,32 L5,0 L161,0 L161,119 L5,119 L5,53 Z" id="D-Floor" fill="#FFFFFF" />
          <text id="D-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="62.2148438" y="83">Temp</tspan>
          </text>
          <text id="D-Name" font-family="Arial-BoldMT, Arial" font-size="24" font-weight="bold" fill="#000000">
            <tspan x="73.8339844" y="55">D</tspan>
          </text>
        </g>
        <g id="C-Room" transform="translate(633.000000, 954.000000)">
          <path d="M5,53 L0,53 L0,32 L5,32 L5,0 L161,0 L161,119 L5,119 L5,53 Z" id="C-Floor" fill="#FFFFFF" />
          <text id="C-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="62.7148438" y="86">Temp</tspan>
          </text>
          <text id="C-Name" font-family="Arial-BoldMT, Arial" font-size="24" font-weight="bold" fill="#000000">
            <tspan x="73.8339844" y="58">C</tspan>
          </text>
        </g>
        <g id="B-Room" transform="translate(633.000000, 831.000000)">
          <path d="M5,54 L0,54 L0,33 L5,33 L5,0 L161,0 L161,119 L5,119 L5,54 Z" fill="#FFFFFF" />
          <text id="B-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="62.2148438" y="89">Temp</tspan>
          </text>
          <text id="B-Name" font-family="Arial-BoldMT, Arial" font-size="24" font-weight="bold" fill="#000000">
            <tspan x="73.8339844" y="61">B</tspan>
          </text>
        </g>
        <g id="Open-Spaces-Room" transform="translate(633.000000, 659.000000)" fill="#FFFFFF">
          <g id="H-Room" transform="translate(163.000000, 0.000000)">
            <path d="M159,85 L163,85 L163,107 L159,107 L159,168 L0,168 L0,0 L159,0 L159,85 Z" id="H-Floor" />
          </g>
          <g id="A-Room">
            <path d="M5,84 L0,84 L0,63 L5,63 L5,0 L164,0 L164,168 L5,168 L5,84 Z" id="A-Floor" />
          </g>
        </g>
        <g id="Wisteria-Room" transform="translate(1002.000000, 1096.000000)">
          <path d="M4,63 L4,0 L130,0 L130,98 L4,98 L4,84 L0,84 L0,63 L4,63 Z" id="Wisteria-Floor" fill="#FFFFFF" />
          <text id="Wisteria-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="45.7148438" y="67">Temp</tspan>
          </text>
          <text id="Wisteria-Name" font-family="Arial-BoldMT, Arial" font-size="17" font-weight="bold" fill="#000000">
            <tspan x="34.0085449" y="39">Wisteria</tspan>
          </text>
        </g>
        <g id="Portia-Room" transform="translate(1002.000000, 994.000000)">
          <path d="M4,37 L4,0 L130,0 L130,98 L4,98 L4,58 L0,58 L0,37 L4,37 Z" id="Portia-Floor" fill="#FFFFFF" />
          <text id="Portia-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="46.2148438" y="68">Temp</tspan>
          </text>
          <text id="Portia-Name" font-family="Arial-BoldMT, Arial" font-size="17" font-weight="bold" fill="#000000">
            <tspan x="42.9111328" y="41">Portia</tspan>
          </text>
        </g>
        <g id="Tamarind-Room" transform="translate(1002.000000, 892.000000)">
          <path d="M4,29 L0,29 L0,8 L4,8 L4,0 L130,0 L130,98 L4,98 L4,29 Z" id="Tamarind-Floor" fill="#FFFFFF" />
          <text id="Tamarind-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="46.2148438" y="70">Temp</tspan>
          </text>
          <text id="Tamarind-Name" font-family="Arial-BoldMT, Arial" font-size="17" font-weight="bold" fill="#000000">
            <tspan x="29.3725586" y="43">Tamarind</tspan>
          </text>
        </g>
        <g id="Guava-Room" transform="translate(1002.000000, 790.000000)">
          <path d="M4,93 L0,93 L0,72 L4,72 L4,0 L130,0 L130,98 L4,98 L4,93 Z" id="Guava-Floor" fill="#FFFFFF" />
          <text id="Guava-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="46.2148438" y="72">Temp</tspan>
          </text>
          <text id="Guava-Name" font-family="Arial-BoldMT, Arial" font-size="17" font-weight="bold" fill="#000000">
            <tspan x="41.0144043" y="45">Guava</tspan>
          </text>
        </g>
        <g id="Mangrove-Room" transform="translate(1015.000000, 508.000000)">
          <path d="M5,56.3736264 L0,56.3736264 L0,35.4945055 L5,35.4945055 L5,0 L124,0 L124,95 L5,95 L5,56.3736264 Z" id="Mangrove-Floor" fill="#FFFFFF" />
          <text id="Mangrove-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="43.7148438" y="69">Temp</tspan>
          </text>
          <text id="Mangrove-Name" font-family="Arial-BoldMT, Arial" font-size="17" font-weight="bold" fill="#000000">
            <tspan x="24.8532715" y="42">Mangrove</tspan>
          </text>
        </g>
        <g id="Aralia-Room" transform="translate(1015.000000, 407.000000)">
          <path d="M5,54.2857143 L0,54.2857143 L0,31.3186813 L5,31.3186813 L5,0 L124,0 L124,95 L5,95 L5,54.2857143 Z" id="Aralia-Floor" fill="#FFFFFF" />
          <text id="Aralia-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="43.7148438" y="70">Temp</tspan>
          </text>
          <text id="Aralia-Name" font-family="Arial-BoldMT, Arial" font-size="17" font-weight="bold" fill="#000000">
            <tspan x="41.3759766" y="43">Aralia</tspan>
          </text>
        </g>
        <g id="Marula-Room" transform="translate(1015.000000, 306.000000)">
          
          <Subscription subscription={onSpeakerStatusChange}>
            {({ data, loading }) => (
              <path d="M5,53.2417582 L0,53.2417582 L0,31.3186813 L5,31.3186813 L5,0 L124,0 L124,95 L5,95 L5,53.2417582 Z" id="Marula-Floor" fill={getFloorFill(data)} />
            )}
          </Subscription>
          
          <Subscription subscription={onTempChanged}>
            {({ data, loading }) => {
              return (
                <text id="Marula-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
                  <tspan x="43.7148438" y="71">{Number.parseFloat(data.roomTempChanged.data.dhtTemperature).toFixed(2)}</tspan>
                </text>
              )
            }}
          </Subscription>

          <text id="Marula-Name" font-family="Arial-BoldMT, Arial" font-size="17" font-weight="bold" fill="#000000">
            <tspan x="37.6032715" y="44">Marula</tspan>
          </text>

        </g>
        <g id="Aloeswood-Room" transform="translate(1015.000000, 205.000000)">
          <path d="M5,52.1978022 L0,52.1978022 L0,30.2747253 L5,30.2747253 L5,0 L124,0 L124,95 L5,95 L5,52.1978022 Z" id="Aloeswood-Floor" fill="#FFFFFF" />
          <text id="Aloeswood-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="43.7148438" y="72">Temp</tspan>
          </text>
          <text id="Aloeswood-Name" font-family="Arial-BoldMT, Arial" font-size="17" font-weight="bold" fill="#000000">
            <tspan x="19.6652832" y="45">Aloeswood</tspan>
          </text>
        </g>
        <g id="Tamboti-Room" transform="translate(1015.000000, 104.000000)">
          <path d="M5,51.1538462 L0,51.1538462 L0,29.2307692 L5,29.2307692 L5,0 L124,0 L124,95 L5,95 L5,51.1538462 Z" id="Tamboti-Floor" fill="#FFFFFF" />
          <text id="Tamboti-Temp" font-family="ArialMT, Arial" font-size="17" font-weight="normal" fill="#000000">
            <tspan x="43.7148438" y="73">TEMP</tspan>
          </text>
          <text id="Tamboti-Name" font-family="Arial-BoldMT, Arial" font-size="17" font-weight="bold" fill="#000000">
            <tspan x="32.5771484" y="46">Tamboti</tspan>
          </text>
        </g>
      </g>
    </g>
  </svg>
);

export default FloorMap;
