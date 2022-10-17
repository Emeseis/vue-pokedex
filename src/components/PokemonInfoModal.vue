<template>
  <v-dialog v-model="visible" scrollable width="1220px" content-class="ma-0" v-if="Object.keys(pokemon).length > 0">    
    <v-card class="card pa-0">
      <v-card-text class="pt-10">      
        <v-row class="text-center">
          <v-col class="pb-2">
            <h1 class="">
              {{ capitalize(pokemon.name) }}
            </h1>
          </v-col>
        </v-row>
        <v-row>
          <v-btn text v-if="pokemon.id != 1" class="no-uppercase-btn ml-3" @click="changePokemon(pokemonPrev)">
            <v-icon left size="24">mdi-menu-left</v-icon>
            #{{ zerofy(pokemonPrev.id) }} {{ capitalize(pokemonPrev.name) }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text v-if="pokemon.id != 151" class="no-uppercase-btn mr-3" @click="changePokemon(pokemonNext)">
            #{{ zerofy(pokemonNext.id) }} {{ capitalize(pokemonNext.name) }}
            <v-icon right size="24">mdi-menu-right</v-icon>
          </v-btn>
        </v-row>
        <v-row>
          <v-col>
            <div class="panel-blue d-flex justify-space-around">
              <v-btn text class="no-uppercase-btn">Info</v-btn>
              <v-btn text class="no-uppercase-btn">Base stats</v-btn>
              <v-btn text class="no-uppercase-btn">Evolution chart</v-btn>
              <v-btn text class="no-uppercase-btn">Pokédex entries</v-btn>
              <v-btn text class="no-uppercase-btn">Moves learned</v-btn>
              <v-btn text class="no-uppercase-btn">Sprites</v-btn>
              <v-btn text class="no-uppercase-btn">Locations</v-btn>
              <v-btn text class="no-uppercase-btn">Language</v-btn>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-img class="img-artwork" style="text-align: center" height="360" width="360" :src="pokemon.sprites.other['official-artwork'].front_default"></v-img>
          </v-col>
          <v-col cols="4">
            <h2 class="ml-4">Pokédex data</h2>
            <v-data-table dense hide-default-footer class="mt-4">
              <template v-slot:body>
                <tbody>
                  <tr>
                    <td class="vertical-header" width="27%">National №</td>
                    <td class="font-weight-bold">{{ zerofy(pokemon.id) }}</td>
                  </tr>
                  <tr>
                    <td class="vertical-header">Type</td>
                    <td>
                      <TypeIcon :type="capitalize(pokemon.types[0].type.name)"/>
                      <TypeIcon :type="capitalize(pokemon.types[1].type.name)" v-if="pokemon.types[1]"/>
                    </td>
                  </tr>
                  <tr>
                    <td class="vertical-header">Species</td>
                    <td>{{ moreInfo.genera[7].genus }}</td>
                  </tr>
                  <tr>
                    <td class="vertical-header">Height</td>
                    <td>{{ (pokemon.height/10).toFixed(1) }} m ({{ toFeetInch((pokemon.height/10)) }})</td>
                  </tr>
                  <tr>
                    <td class="vertical-header">Weight</td>
                    <td>{{ (pokemon.weight/10).toFixed(1) }} kg ({{ ((pokemon.weight/10)*2.2046).toFixed(1) }} lbs)</td>
                  </tr>
                  <tr>
                    <td class="vertical-header">Abilities</td>
                    <td :class="pokemon.abilities.length > 1 ? 'pt-1' : ''">
                      <span v-for="(ability, index) in pokemon.abilities" :key="index">
                        <span v-if="!ability.is_hidden">{{ index+1 }}. </span>
                        <a><span :class="ability.is_hidden ? 'text-small' : ''">{{ capitalize(ability.ability.name) }}</span></a>
                        <span v-if="ability.is_hidden" class="text-small g"> (ability hidden)</span>
                        <br>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="vertical-header">Local №</td>
                    <td class="pt-1">
                      <div v-if="PokeDex[0]">
                        {{ zerofy(PokeDex[0].entry_number) }} <span class="text-small g">(Red/Blue/Yellow)</span><br>
                      </div>
                      <div v-if="PokeDex[1]">
                        {{ zerofy(PokeDex[1].entry_number) }} <span class="text-small g">(Gold/Silver/Crystal)</span><br>
                      </div>
                      <div v-if="PokeDex[2]">
                        {{ zerofy(PokeDex[2].entry_number) }} <span class="text-small g">(FireRed/LeafGreen)</span><br>
                      </div>
                      <div v-if="PokeDex[3]">
                        {{ zerofy(PokeDex[3].entry_number) }} <span class="text-small g">(HeartGold/SoulSilver)</span><br>
                      </div>
                      <div v-if="PokeDex[4]">
                        {{ zerofy(PokeDex[4].entry_number) }} <span class="text-small g">(X/Y — Central Kalos)</span><br>
                      </div>
                      <div v-if="PokeDex[5]">
                        {{ zerofy(PokeDex[5].entry_number) }} <span class="text-small g">(Let's Go Pikachu/Eevee)</span><br>
                      </div>
                      <div v-if="PokeDex[6]">
                        {{ zerofy(PokeDex[6].entry_number) }} <span class="text-small g">(The Isle of Armor)</span><br>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-col>
          <v-col cols="4">
            <h2>Training</h2>
            <v-data-table dense hide-default-footer class="mt-4">
              <template v-slot:body>
                <tbody>
                  <tr>
                    <td class="vertical-header" width="35%">EV Yield</td>
                    <td>
                      <span v-if="EV_HP">{{ EV_HP }} HP</span>
                      <span v-if="EV_HP && (EV_Atk || EV_Def || EV_SpAtk || EV_SpDef || EV_Speed)">, </span>
                      <span v-if="EV_Atk">{{ EV_Atk }} Attack</span>
                      <span v-if="EV_Atk && (EV_Def || EV_SpAtk || EV_SpDef || EV_Speed)">, </span>
                      <span v-if="EV_Def">{{ EV_Def }} Defense</span>
                      <span v-if="EV_Def && (EV_SpAtk || EV_SpDef || EV_Speed)">, </span>
                      <span v-if="EV_SpAtk">{{ EV_SpAtk }} Special Attack</span>
                      <span v-if="EV_SpAtk && (EV_SpDef || EV_Speed)">, </span>
                      <span v-if="EV_SpDef">{{ EV_SpDef }} Special Defense</span>
                      <span v-if="EV_SpDef && (EV_Speed)">, </span>
                      <span v-if="EV_Speed">{{ EV_Speed }} Speed</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="vertical-header">Catch Rate</td>
                    <td>{{ moreInfo.capture_rate }}<span class="text-small g"> ({{ Math.round((moreInfo.capture_rate*0.130719)*10)/10 }}% with PokéBall, full HP)</span></td>
                  </tr>
                  <tr>
                    <td class="vertical-header">Base Friendship</td>
                    <td>
                      {{ moreInfo.base_happiness }} 
                      <span v-if="moreInfo.base_happiness <  50" class="text-small g">(lower than normal)</span>
                      <span v-if="moreInfo.base_happiness == 50" class="text-small g">(normal)</span>
                      <span v-if="moreInfo.base_happiness >  50" class="text-small g">(higher than normal)</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="vertical-header">Base Exp.</td>
                    <td>{{ pokemon.base_experience }}</td>
                  </tr>
                  <tr>
                    <td class="vertical-header">Growth Rate</td>
                    <td>{{ Growth_Rate }}</td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
            <h2 class="mt-4">Breeding</h2>
            <v-data-table dense hide-default-footer class="mt-4">
              <template v-slot:body>
                <tbody>
                  <tr>
                    <td class="vertical-header" width="26%">Egg Groups</td>
                    <td>
                      <a><span>{{ capitalize(moreInfo.egg_groups[0].name) }}</span></a>
                      <span v-if="moreInfo.egg_groups[1]">, </span>
                      <a><span v-if="moreInfo.egg_groups[1]">{{ capitalize(moreInfo.egg_groups[1].name) }}</span></a>
                    </td>
                  </tr>
                  <tr>
                    <td class="vertical-header">Gender</td>
                    <td>
                      <span v-if="moreInfo.gender_rate!=-1" style="color: #3273dc">{{ (8-moreInfo.gender_rate)*12.5 }}% male</span>
                      <span v-if="moreInfo.gender_rate!=-1">,</span>
                      <span v-if="moreInfo.gender_rate!=-1" style="color: #ff6bce"> {{ moreInfo.gender_rate*12.5 }}% female</span>
                      <span v-else>Genderless</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="vertical-header">Egg cycles</td>
                    <td>
                      {{ moreInfo.hatch_counter }}
                      <span class="text-small g">
                        ({{ (moreInfo.hatch_counter*257-256).toLocaleString('en') }}–{{ (moreInfo.hatch_counter*257).toLocaleString('en') }} steps)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <h2>Base stats</h2>
            <v-data-table dense hide-default-footer class="mt-4">
              <template v-slot:body>
                <tbody>
                  <tr>
                    <td class="vertical-header" width="10%">HP</td>
                    <td style="text-align: right" width="5%">{{ Sts_HP }}</td>
                    <td>
                      <v-progress-linear
                        :value="getPercentage(Sts_HP)"
                        :color="getStatColor(Sts_HP)"
                        height="15"
                        background-opacity="0"
                      ></v-progress-linear>
                    </td>
                    <td style="text-align: right" width="5%">{{ (2*Sts_HP+110) }}</td>
                    <td style="text-align: right" width="5%">{{ (2*Sts_HP+204) }}</td>
                  </tr>
                  <tr>
                    <td class="vertical-header">Attack</td>
                    <td style="text-align: right">{{ Sts_Atk }}</td>
                    <td>
                      <v-progress-linear
                        :value="getPercentage(Sts_Atk)"
                        :color="getStatColor(Sts_Atk)"
                        height="15"
                        background-opacity="0"
                      ></v-progress-linear>
                    </td>
                    <td style="text-align: right">{{ Math.floor((Sts_Atk*2+5)*0.9) }}</td>
                    <td style="text-align: right">{{ Math.floor((Sts_Atk*2+99)*1.1) }}</td>
                  </tr>
                  <tr>
                    <td class="vertical-header">Defense</td>
                    <td style="text-align: right">{{ Sts_Def }}</td>
                    <td>
                      <v-progress-linear
                        :value="getPercentage(Sts_Def)"
                        :color="getStatColor(Sts_Def)"
                        height="15"
                        background-opacity="0"
                      ></v-progress-linear>
                    </td>
                    <td style="text-align: right">{{ Math.floor((Sts_Def*2+5)*0.9) }}</td>
                    <td style="text-align: right">{{ Math.floor((Sts_Def*2+99)*1.1) }}</td>
                  </tr>
                  <tr>
                    <td class="vertical-header">Sp. Atk</td>
                    <td style="text-align: right">{{ Sts_SpAtk }}</td>
                    <td>
                      <v-progress-linear
                        :value="getPercentage(Sts_SpAtk)"
                        :color="getStatColor(Sts_SpAtk)"
                        height="15"
                        background-opacity="0"
                      ></v-progress-linear>
                    </td>
                    <td style="text-align: right">{{ Math.floor((Sts_SpAtk*2+5)*0.9) }}</td>
                    <td style="text-align: right">{{ Math.floor((Sts_SpAtk*2+99)*1.1) }}</td>
                  </tr>
                  <tr>
                    <td class="vertical-header">Sp. Def</td>
                    <td style="text-align: right">{{ Sts_SpDef }}</td>
                    <td>
                      <v-progress-linear
                        :value="getPercentage(Sts_SpDef)"
                        :color="getStatColor(Sts_SpDef)"
                        height="15"
                        background-opacity="0"
                      ></v-progress-linear>
                    </td>
                    <td style="text-align: right">{{ Math.floor((Sts_SpDef*2+5)*0.9) }}</td>
                    <td style="text-align: right">{{ Math.floor((Sts_SpDef*2+99)*1.1) }}</td>
                  </tr>
                  <tr>
                    <td class="vertical-header">Speed</td>
                    <td style="text-align: right">{{ Sts_Speed }}</td>
                    <td>
                      <v-progress-linear
                        :value="getPercentage(Sts_Speed)"
                        :color="getStatColor(Sts_Speed)"
                        height="15"
                        background-opacity="0"
                      ></v-progress-linear>
                    </td>
                    <td style="text-align: right">{{ Math.floor((Sts_Speed*2+5)*0.9) }}</td>
                    <td style="text-align: right">{{ Math.floor((Sts_Speed*2+99)*1.1) }}</td>
                  </tr>
                  <tr>
                    <td class="vertical-header">Total</td>
                    <td class="font-weight-bold">{{ Sts_Total }}</td>
                    <td></td>
                    <td class="vertical-header">Min</td>
                    <td class="vertical-header">Max</td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
            <div class="mt-4 text-small g">The ranges shown on the right are for a level 100 Pokémon. Maximum values are based on a beneficial nature, 252 EVs, 31 IVs; minimum values are based on a hindering nature, 0 EVs, 0 IVs.</div>
          </v-col>
          <v-col cols="4">
            <h2>Type defenses</h2>
            <p class="mt-4">The effectiveness of each type on <span class="font-italic">{{ capitalize(pokemon.name) }}</span></p>
            <div>
              <v-btn x-small dark depressed class="type-icon2" color="#aa9">NOR</v-btn>
              <v-btn x-small dark depressed class="type-icon2" color="#f42">FIR</v-btn>
              <v-btn x-small dark depressed class="type-icon2" color="#39f">WAT</v-btn>
              <v-btn x-small dark depressed class="type-icon2" color="#fc3">ELE</v-btn>
              <v-btn x-small dark depressed class="type-icon2" color="#7c5">GRA</v-btn>
              <v-btn x-small dark depressed class="type-icon2" color="#6cf">ICE</v-btn>
              <v-btn x-small dark depressed class="type-icon2" color="#b54">FIG</v-btn>
              <v-btn x-small dark depressed class="type-icon2" color="#a59">POI</v-btn>
              <v-btn x-small dark depressed class="type-icon2" color="#db5">GRO</v-btn>
            </div>
            <div>
              <EffectivenessIcon :typeDefense="typeDefenses.normal"/>
              <EffectivenessIcon :typeDefense="typeDefenses.fire"/>
              <EffectivenessIcon :typeDefense="typeDefenses.water"/>
              <EffectivenessIcon :typeDefense="typeDefenses.electric"/>
              <EffectivenessIcon :typeDefense="typeDefenses.grass"/>
              <EffectivenessIcon :typeDefense="typeDefenses.ice"/>
              <EffectivenessIcon :typeDefense="typeDefenses.fighting"/>
              <EffectivenessIcon :typeDefense="typeDefenses.poison"/>
              <EffectivenessIcon :typeDefense="typeDefenses.ground"/>
            </div>
            <div class="mt-2">
              <v-btn x-small dark depressed class="type-icon2" color="#89f">FLY</v-btn>
              <v-btn x-small dark depressed class="type-icon2" color="#f59">PSY</v-btn>
              <v-btn x-small dark depressed class="type-icon2" color="#ab2">BUG</v-btn>
              <v-btn x-small dark depressed class="type-icon2" color="#ba6">ROC</v-btn>
              <v-btn x-small dark depressed class="type-icon2" color="#66b">GHO</v-btn>
              <v-btn x-small dark depressed class="type-icon2" color="#76e">DRA</v-btn>
              <v-btn x-small dark depressed class="type-icon2" color="#754">DAR</v-btn>
              <v-btn x-small dark depressed class="type-icon2" color="#aab">STE</v-btn>
              <v-btn x-small dark depressed class="type-icon2" color="#e9e">FAI</v-btn>
            </div>
            <div>
              <EffectivenessIcon :typeDefense="typeDefenses.flying"/>
              <EffectivenessIcon :typeDefense="typeDefenses.psychic"/>
              <EffectivenessIcon :typeDefense="typeDefenses.bug"/>
              <EffectivenessIcon :typeDefense="typeDefenses.rock"/>
              <EffectivenessIcon :typeDefense="typeDefenses.ghost"/>
              <EffectivenessIcon :typeDefense="typeDefenses.dragon"/>
              <EffectivenessIcon :typeDefense="typeDefenses.dark"/>
              <EffectivenessIcon :typeDefense="typeDefenses.steel"/>
              <EffectivenessIcon :typeDefense="typeDefenses.fairy"/>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h2>Evolution chart</h2>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import all_types from '../assets/all_types.json';
import TypeIcon from '@/components/TypeIcon.vue';
import EffectivenessIcon from '@/components/EffectivenessIcon.vue';
export default {
  name: 'InfoModal',
  props: ['value','pokemon','pokemonPrev','pokemonNext','moreInfo'],
  components: {
    TypeIcon,
    EffectivenessIcon
  },
  watch: {
    pokemon(newV) {
      if(newV) {
        let arrayType = [];
        this.pokemon.types.forEach(type => { arrayType.push(type.type.name) });
        this.getMultipliers(arrayType);
      }
    }
  },
  computed: {
    visible: {
      get () { return this.value },
      set (value) { this.$emit('input', value) }
    },
    EV_HP() {
      return this.pokemon.stats[0].effort
    },
    EV_Atk() {
      return this.pokemon.stats[1].effort
    },
    EV_Def() {
      return this.pokemon.stats[2].effort
    },
    EV_SpAtk() {
      return this.pokemon.stats[3].effort
    },
    EV_SpDef() {
      return this.pokemon.stats[4].effort
    },
    EV_Speed() {
      return this.pokemon.stats[5].effort
    },
    Sts_HP() {
      return this.pokemon.stats[0].base_stat
    },
    Sts_Atk() {
      return this.pokemon.stats[1].base_stat
    },
    Sts_Def() {
      return this.pokemon.stats[2].base_stat
    },
    Sts_SpAtk() {
      return this.pokemon.stats[3].base_stat
    },
    Sts_SpDef() {
      return this.pokemon.stats[4].base_stat
    },
    Sts_Speed() {
      return this.pokemon.stats[5].base_stat
    },
    Sts_Total() {
      return (
        this.pokemon.stats[0].base_stat +
        this.pokemon.stats[1].base_stat +
        this.pokemon.stats[2].base_stat +
        this.pokemon.stats[3].base_stat +
        this.pokemon.stats[4].base_stat +
        this.pokemon.stats[5].base_stat
      )
    },
    PokeDex() {
      return this.moreInfo.pokedex_numbers
    },
    Growth_Rate() {
      if (this.moreInfo.growth_rate.name == 'slow') return 'Slow';
      if (this.moreInfo.growth_rate.name == 'slow-then-very-fast') return 'Erratic';
      if (this.moreInfo.growth_rate.name == 'medium') return 'Medium';
      if (this.moreInfo.growth_rate.name == 'medium-slow') return 'Medium Slow';
      if (this.moreInfo.growth_rate.name == 'fast') return 'Fast';
      if (this.moreInfo.growth_rate.name == 'fast-then-very-slow') return 'Fluctuating';
      return '';
    },
  },
  data: () => ({
    typeDefenses: {}
  }),
  methods: {
    capitalize(string) {
      if (!string) return;
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    zerofy(value) {
      if (!value) return;
      let zeroes = new Array(4).join("0");
      return (zeroes + value).slice(-3);
    },
    zerofy2(value) {
      if (!value) return;
      let zeroes = new Array(3).join("0");
      return (zeroes + value).slice(-2);
    },
    changePokemon(id) {
      this.visible = false;
      this.$emit('changePokemon', id)
    },
    toFeetInch(m) {
      let cm = m*100;
      let realFeet = ((cm*0.393700) / 12);
      let feet = Math.floor(realFeet);
      let inches = Math.round((realFeet - feet) * 12);
      inches = this.zerofy2(inches)
      if (inches == 12) { feet++; inches = '00' }
      let number = `${feet}′${inches}″`
      return number;
    },
    getPercentage(value) {
      let newValue = (value * 100)/180;
      return newValue;
    },
    getStatColor(value) {
      if (value <= 29) return '#f34444';
      if (value <= 59) return '#ff7f0f';
      if (value <= 89) return '#ffdd57';
      if (value <= 119) return '#a0e515';
      if (value <= 149) return '#23cd5e';
      else return '#00c2b8';
    },
    getMultipliers(types) {
      let multipliers = { defense: {}, attack: {} };

      types.forEach((type) => {
        let damage_relations = all_types[type];
        let no_damage_from = damage_relations.defense.zero;
        let half_damage_from = damage_relations.defense.half;
        let double_damage_from = damage_relations.defense.double;

        no_damage_from.forEach((type) => {
          if (Object.prototype.hasOwnProperty.call(multipliers.defense, type)) multipliers.defense[type] = multipliers.defense[type] * 0;
          else multipliers.defense[type] = 0;
        });

        half_damage_from.forEach((type) => {
          if (Object.prototype.hasOwnProperty.call(multipliers.defense, type)) multipliers.defense[type] = multipliers.defense[type] * 0.5;
          else multipliers.defense[type] = 0.5;
        });

        double_damage_from.forEach((type) => {
          if (Object.prototype.hasOwnProperty.call(multipliers.defense, type)) multipliers.defense[type] = multipliers.defense[type] * 2;
          else multipliers.defense[type] = 2;
        });

      });
      this.typeDefenses = multipliers.defense;
    }
  },
};
</script>

<style scoped>
  .card {
    padding: 1.5rem 2rem;
  }
  .img-artwork {
    margin: 0 auto;
  }
  .table {
    border: solid 1px blue;
  }
  .panel-blue {
    background-color: #c7eaff;
    padding: .2rem 0 .2rem 0;
    border-radius: 4px;
  }
  .vertical-header {
    color: #737373;
    text-align: right;
    font-size: 0.875rem !important;
  }
  .g {
    color: #737373;
  }
  .no-uppercase-btn {
    color: #2769be !important;
    text-decoration: none;
    font-weight: normal;
  }
  .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    font-size: 1rem;
    padding: 0 12px;
  }
  :deep(.v-progress-linear__determinate) {
    border-radius: 4px;
    border: 1px solid rgba(0,0,0,.15) !important;
  }
  .type-icon2 {
    width: 36px;
    margin: 1px;
    min-height: 36px;
    border: 1px solid rgba(0,0,0,.2) !important;
    font-weight: 400 !important;
    text-shadow: 1px 1px 2px rgb(0 0 0 / 70%);
  }
</style>
