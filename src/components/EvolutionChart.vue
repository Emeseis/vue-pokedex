<template>
  <div id="tree" ref="tree"></div>
</template>

<script>
import OrgChart from '@balkangraph/orgchart.js'
export default {
  name: 'tree',
  props: ['nodes'],
  data() { return { chart: '' } },
  methods: {
    myTree(domEl, x) {
      OrgChart.templates.customTemplate = Object.assign({}, OrgChart.templates.diva);
      OrgChart.templates.customTemplate.svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background-color:transparent;display:block;" width="{w}" height="{h}" viewBox="{viewBox}">{content}</svg>';
      OrgChart.templates.customTemplate.size = [144, 250];
      OrgChart.templates.customTemplate.node = '';
      OrgChart.templates.customTemplate.plus = '';
      OrgChart.templates.customTemplate.minus = '';
      OrgChart.templates.customTemplate.field_0 = '<text class="id-text" x="72" y="187">#{val}</text>';
      OrgChart.templates.customTemplate.field_1 = '<text class="name-text" x="72" y="212">{val}</text>';
      OrgChart.templates.customTemplate.field_2 = '{val}'
      OrgChart.templates.customTemplate.link_field_0 = '<text class="arrow-text" x="0" y="40">({val})</text>';
      OrgChart.templates.customTemplate.img_0 = '<image class="image-chart" xlink:href="{val}" x="0" y="30" width="144" height="144"/>';
      OrgChart.templates.customTemplate.link = 
      '<marker id="head" orient="auto" markerWidth="5" markerHeight="5" refX="5" refY="5" viewBox="0 0 10 10">' +
        '<polyline points="0,5 5,2.5 0,0" fill="none" stroke-width="1" stroke="black" stroke-linecap="round" transform="matrix(1,0,0,1,1.6666666666666667,2.5)" stroke-linejoin="round"></polyline>' + 
      '</marker>' +
      '<path d="{edge}" stroke="black" stroke-width="3px" fill="none" marker-end="url(#head)" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}"/>';

      this.chart = new OrgChart(domEl, {
        template: "customTemplate",
        mouseScrool: OrgChart.action.none,
        enableDragDrop: false,
        nodeMouseClick: OrgChart.none,
        interactive: true,
        enableSearch: false,
        scaleInitial: this.nodes[0].name == "Eevee" ? 0.9 : 1,
        nodes: x,
        linkBinding: {
          link_field_0: "evolve_trigger"
        },
        nodeBinding: {
          field_0: "idF",
          field_1: "name",
          field_2: "types",
          img_0: "img"
        },
      });

      this.chart.onNodeClick(args => {
        let targetClass = args.event.target.classList.value;
        if (targetClass == "name-text" || targetClass == "image-chart") this.changePokemon({ id: args.node.id });
      });

      let height = ((this.nodes[this.nodes.length-1].level)*295)+'px';
      let orgChart = document.getElementById('tree');
      orgChart.style.height = height;
    },
    changePokemon(pokemon) {
      this.$emit('changePokemon', pokemon);
    },
  },
  mounted() {
    this.myTree(this.$refs.tree, this.nodes);
  },
}
</script>

<style scoped>
</style>

<style>
.Fire {
  fill: #d52100 !important;
}
.Grass {
  fill: #5cb737 !important;
}
.Poison {
  fill: #88447a !important;
}
.Flying {
  fill: #556dff !important;
}
.Water {
  fill: #0080ff !important;
}
.Bug {
  fill: #83901a !important;
}
.Ground {
  fill: #bf9926 !important;
}
.Normal {
  fill: #797964 !important;
}
.Dragon {
  fill: #4e38e9 !important;
}
.Psychic {
  fill: #ff227a !important;
}
.Electric {
  fill: #c90 !important;
}
.Fighting {
  fill: #a84d3d !important;
}
.Rock {
  fill: #a59249 !important;
}
.Ghost {
  fill: #5454b3 !important;
}
.Fairy {
  fill: #ffb8d5 !important;
}
.Ice {
  fill: #0af !important;
}
#tree {
  width: 100%;
  height: 600px;
}
.id-text {
  font-size: 14px;
  font-family: "Fira Sans";
  text-anchor: middle;
  fill: #737373;
}
.name-text {
  font-size: 1rem;
  font-family: "Fira Sans";
  font-weight: bold;
  fill: #2769be;
  text-anchor: middle;
  text-decoration: none;
  transition: fill .2s;
}
.types-text {  
  font-size: 14px;
  font-family: "Fira Sans";
  text-anchor: middle;
}
.arrow-text {
  font-size: 14px;
  font-family: "Fira Sans";
  text-anchor: middle;
  fill: black;
}
.name-text:hover {
  fill: #a42121;
  cursor: pointer;
  text-decoration: underline;
  outline: 0;
}
.image-chart:hover {
  cursor: pointer;
}
</style>