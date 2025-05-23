<template>
    <div id="map" style="height:100%; width:100%">
    </div>
</template>
  
<script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import 'leaflet.heat'

  import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
  import markerIcon from 'leaflet/dist/images/marker-icon.png';
  import markerShadow from 'leaflet/dist/images/marker-shadow.png';

  delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

  export default {
    name: 'LeafletMap',
    mounted(){
      const map = L.map('map').setView([53.4808, -2.2426], 13); //17 @ manchester city,  12 @ manchester, 5 @ UK

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const marker1 = L.marker([53.4808, -2.2426])
        .addTo(map)
        .bindPopup('Manchester');

      marker1.on('click', () => {
    this.$router.push('/device1'); // or use window.location.href = '/page-a' if not using Vue Router
          
  });
      /*
      const marker2 = L.marker([53.4631, -2.2913])
        .addTo(map)
        .bindPopup('Old Trafford');

      marker2.on('click', () => {
    this.$router.push('/device1'); // or use window.location.href = '/page-a' if not using Vue Router
          
  });

      const marker3 = L.marker([53.4808, -2.209])
        .addTo(map)
        .bindPopup('Bradford');

      marker3.on('click', () => {
    this.$router.push('/device1'); // or use window.location.href = '/page-a' if not using Vue Router
          
  });

      const marker4 = L.marker([53.4975, -2.2373])
        .addTo(map)
        .bindPopup('Cheetham Hill');

      marker4.on('click', () => {
    this.$router.push('/device1'); // or use window.location.href = '/page-a' if not using Vue Router
          
  });

      const marker5 = L.marker([53.4873, -2.2900])
        .addTo(map)
        .bindPopup('Salford');

      marker5.on('click', () => {
    this.$router.push('/device1'); // or use window.location.href = '/page-a' if not using Vue Router
          
  });

      const marker6 = L.marker([53.4698, -2.2375])
        .addTo(map)
        .bindPopup('Chorlton-on-Medlock');

      marker6.on('click', () => {
    this.$router.push('/device1'); // or use window.location.href = '/page-a' if not using Vue Router
          
  });

      const marker7 = L.marker([55.9533, -3.1883])
        .addTo(map)
        .bindPopup('Edinburgh');

      marker7.on('click', () => {
    this.$router.push('/device1'); // or use window.location.href = '/page-a' if not using Vue Router
          
  });

      const marker8 = L.marker([51.5072, -0.1276])
        .addTo(map)
        .bindPopup('London');

      marker8.on('click', () => {
    this.$router.push('/device1'); // or use window.location.href = '/page-a' if not using Vue Router
          
  });

      const marker9 = L.marker([51.4873, -3.1681])
        .addTo(map)
        .bindPopup('Cardiff');

      marker9.on('click', () => {
    this.$router.push('/device1'); // or use window.location.href = '/page-a' if not using Vue Router
          
  });

    const marker10 = L.marker([52.4823, -1.8900])
        .addTo(map)
        .bindPopup('Birmingham');

      marker10.on('click', () => {
    this.$router.push('/device1'); // or use window.location.href = '/page-a' if not using Vue Router
          
  });

      const marker11 = L.marker([57.1499, -2.0938])
        .addTo(map)
        .bindPopup('Aberdeen');

      marker11.on('click', () => {
    this.$router.push('/device1'); // or use window.location.href = '/page-a' if not using Vue Router
          
  });

      const marker12 = L.marker([54.9783, -1.6178])
        .addTo(map)
        .bindPopup('Newcastle Upon Tyne');

      marker12.on('click', () => {
    this.$router.push('/device1'); // or use window.location.href = '/page-a' if not using Vue Router
          
  });
  */
    
  const legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
  const div = L.DomUtil.create('div', 'info legend');
  div.innerHTML = `
    <h4>Legend</h4>
    <i style="background: red"></i> THD>10% <br>
    <i style="background: yellow"></i> THD<10% <br>
    <i style="background: blue"></i> THD<5% <br>
  `;
  return div;
};

legend.addTo(map);

  

      /*const marker2 = L.marker([53.4800, -2.2430])
        .addTo(map)
        .bindPopup('53.4800, -2.2430');*/

        /*marker2.on('click', () => {
    this.$router.push('/device2'); // or use window.location.href = '/page-a' if not using Vue Router
  });*/

      //Heatmap data: [lat, lngm intensity]
      const heatData = [

      [53.4808, -2.2426, 0.91],
      //[53.4800, -2.2430, 0.8],
      //[51.507, -0.08, 0.2],
      //[51.503, -0.095, 0.6],
      
      ];

      L.heatLayer(heatData, {
        radius: 25,
        blur: 20,
        maxZoom: 17,
      }).addTo(map);

      setTimeout(() => {
    map.invalidateSize();
  }, 300);

    window.addEventListener('resize', this.handleResize);
    window.addEventListener('orientationchange', this.handleResize);
    },
    methods: {
    handleResize() {
      if (this.map) {
        setTimeout(() => {
          this.map.invalidateSize();
        }, 300); // Delay ensures layout has updated
      }
    }
  },
  beforeUnmount() {
    // 🧹 Clean up listeners
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('orientationchange', this.handleResize);

    if (this.map) {
      this.map.remove(); // Properly remove the map
      this.map = null;
    }
  }
  };
</script>
  
<style>
.info.legend {
  background: white;
  padding: 6px 8px;
  font: 14px Arial, sans-serif;
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  border-radius: 5px;
  line-height: 18px;
  color: #555;
}
.info.legend i {
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
  opacity: 0.7;
}
</style>