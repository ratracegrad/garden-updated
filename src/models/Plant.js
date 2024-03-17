import Layout from './Layout';

const plantObjects = [
  {
    id: 1,
    name: 'Beet',
    namePlural: 'Beets',
    scientificName: 'Solanum lycopersicum',
    layoutIds: [1],
    goodNeighborIds: [2, 3],
    badNeighborIds: [4, 5],
    className: 'beet',
    imageName: 'beet',
    defaultLayout: () => Layout.getObject(1),
  },
  {
    id: 2,
    name: 'Carrot',
    namePlural: 'Carrots',
    scientificName: 'Solanum lycopersicum',
    layoutIds: [1],
    goodNeighborIds: [2, 3],
    badNeighborIds: [4, 5],
    className: 'carrot',
    imageName: 'carrot',
    defaultLayout: () => Layout.getObject(1),
  },
  {
    id: 3,
    name: 'Garlic',
    namePlural: 'Garlics',
    scientificName: 'Solanum lycopersicum',
    layoutIds: [1],
    goodNeighborIds: [2, 3],
    badNeighborIds: [4, 5],
    className: 'garlic',
    imageName: 'garlic',
    defaultLayout: () => Layout.getObject(1),
  },
  {
    id: 4,
    name: 'Leek',
    namePlural: 'Leeks',
    scientificName: 'Solanum lycopersicum',
    layoutIds: [1],
    goodNeighborIds: [2, 3],
    badNeighborIds: [4, 5],
    className: 'leek',
    imageName: 'leek',
    defaultLayout: () => Layout.getObject(1),
  },
  {
    id: 5,
    name: 'Lettuce',
    namePlural: 'Lettuces',
    scientificName: 'Solanum lycopersicum',
    layoutIds: [1],
    goodNeighborIds: [2, 3],
    badNeighborIds: [4, 5],
    className: 'lettuce',
    imageName: 'lettuce',
    defaultLayout: () => Layout.getObject(1),
  },
  {
    id: 6,
    name: 'Onion',
    namePlural: 'Onions',
    scientificName: 'Solanum lycopersicum',
    layoutIds: [1],
    goodNeighborIds: [2, 3],
    badNeighborIds: [4, 5],
    className: 'onion',
    imageName: 'onion',
    defaultLayout: () => Layout.getObject(1),
  },
  {
    id: 7,
    name: 'Pea',
    namePlural: 'Peas',
    scientificName: 'Solanum lycopersicum',
    layoutIds: [1],
    goodNeighborIds: [2, 3],
    badNeighborIds: [4, 5],
    className: 'pea',
    imageName: 'pea',
    defaultLayout: () => Layout.getObject(1),
  },
  {
    id: 8,
    name: 'Radish',
    namePlural: 'Radishes',
    scientificName: 'Solanum lycopersicum',
    layoutIds: [1],
    goodNeighborIds: [2, 3],
    badNeighborIds: [4, 5],
    className: 'radish',
    imageName: 'radish',
    defaultLayout: () => Layout.getObject(1),
  },
  {
    id: 9,
    name: 'Spinach',
    namePlural: 'Spinaches',
    scientificName: 'Solanum lycopersicum',
    layoutIds: [1],
    goodNeighborIds: [2, 3],
    badNeighborIds: [4, 5],
    className: 'spinach',
    imageName: 'spinach',
    defaultLayout: () => Layout.getObject(1),
  },
  {
    id: 10,
    name: 'Strawberry',
    namePlural: 'Strawberries',
    scientificName: 'Solanum lycopersicum',
    layoutIds: [1],
    goodNeighborIds: [2, 3],
    badNeighborIds: [4, 5],
    className: 'strawberry',
    imageName: 'strawberry',
    defaultLayout: () => Layout.getObject(1),
  },
  {
    id: 11,
    name: 'Tomato',
    namePlural: 'Tomatoes',
    scientificName: 'Solanum lycopersicum',
    layoutIds: [1],
    goodNeighborIds: [2, 3],
    badNeighborIds: [4, 5],
    className: 'tomato',
    imageName: 'tomato',
    defaultLayout: () => Layout.getObject(1),
  },
];


export default class Plant {
  constructor(resource) {
    this.id = resource.id;
    this.name = resource.name;
    this.namePlural = resource.name_plural;
    this.scientificName = resource.scientific_name;
    this.layoutIds = resource.layouts;
    this.goodNeighborIds = resource.good_neighbors;
    this.badNeighborIds = resource.bad_neighbors;
    this.className = resource.name.toLowerCase().replace(/ /g, '-');
    this.imageName = resource.name.toLowerCase().replace(/ /g, '-');
    this.defaultLayout = this.defaultLayout.bind(this);
  }

  static getObject(id) {
    return plantObjects.find(plant => plant.id === id);
  }

  static allObjects() {
    return plantObjects;
  }

  static loadObjectsFromApi() {
    // fetch('/backend/plants/')
    //   .then(response => {
    //     return (response.status === 200) ? response.json() : null;
    //   })
    //   .then(data => {
    //     if (data) {
    //       data.forEach(resource => plantObjects.push(new Plant(resource)));
    //     }
    //   });
    plantObjects.push(new Plant({
      id: 1,
      name: 'Tomato',
      name_plural: 'Tomatoes',
      scientific_name: 'Solanum lycopersicum',
      layouts: [1],
      good_neighbors: [2, 3],
      bad_neighbors: [4, 5]
    }));
  }

  defaultLayout() {
    return Layout.getObject(this.layoutIds[0]);
  }
}