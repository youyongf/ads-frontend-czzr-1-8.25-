// 已完成
export default {
  monitor:{
    /** agv.vue start */
    carPlaceholder: "បញ្ចូល លេខ រថយន្ត",
    vehicle: "រថយន្ត",
    vFeedback: "មតិ យោបល់ រថ យន្ត",
    tFeedback: "ពេលវេលាបញ្ចេញមតិ",
    cahngeTime: "ពេលវេលា ផ្លាស់ប្ដូរ ស្ថានភាព",
    aOtherInfo: "ព័ត៌មានផ្សេងទៀតអំពី AGV",
    dInstruction: "ការណែនាំអំពីការកំណត់ពេលវេលា",
    deliveryTime: "ពេលវេលាបញ្ជូន",
    instruction: "ការ​ពិពណ៌នា​កាលវិភាគ",
    routing: "ការ ចែក ចាយ ផ្លូវ",
    reroute: "ផ្លាស់ប្តូរផ្លូវ",
    changeRoute: "ថាតើត្រូវផ្លាស់ប្តូរផ្លូវរថយន្តទៅ",
    routeSuccess: "ផ្លូវ ចែក ចាយ ទទួល បាន ជោគជ័យ",
    routeFailed: "បរាជ័យ ក្នុង ការ ដឹក ជញ្ជូន ផ្លូវ",

    AFDFailed: "បាន​បរាជ័យ​ទិន្នន័យ​មតិយោបល់​របស់ AGV",
    ASDFailed: "ផ្ញើ -> បរាជ័យ​ទិន្នន័យ AGV",
    queryRouteFailed: "មិន បាន សម្រេច តាម ផ្លូវ សួរ",
    /** agv.vue end */
    // agvQtime.vue
    refreshInterval: "អាំងទែរណាល់ស្រស់",
    inProcessTime: "ពេល វេលា ក្នុង ការ រីក ចម្រើន",
    dataIsEmpty: "ទិន្នន័យ គឺ ទទេ",
    agvInfoAcqFailed: "បាន​បរាជ័យ​ក្នុង​ការ​ទទួល​យក​ព័ត៌មាន AGV",
    /** agvstate_list.vue.vue start */
    group: "មណ្ឌលបោះឆ្នោត",
    destination: "ទិសដៅ",
    condition: "ស្ថានភាព អាំងហ្វ្រេដ និង អគ្គីសនី",
    nextStep: "ជំហាន បន្ទាប់",
    clearCondition: "ជម្រះលក្ខខណ្ឌ",
    feed: "ការ ចិញ្ចឹម",
    discharge: "បណ្តេញចេញ",
    refueling: "ការ ចម្រាញ់ ប្រេង",
    noTransmission: "គ្មាន ការ បញ្ជូន",
    toMachine: "ផ្ទេរ សម្ភារៈ ទៅ ម៉ាស៊ីន",
    reMaterial: "ការ ស្ពាយ",
    releasePoint: "ការ ចេញ ផ្សាយ ចំណុច",
    vehicleInspection: "ការត្រួតពិនិត្យរថយន្ត",
    focusVehicle: "រថយន្តដែលត្រូវការការយកចិត្តទុកដាក់គឺ៖",
    numberLayers: "ចំនួនស្រទាប់",
    lessThan: "ខាងក្រោមនេះ",
    layer: "ស្រទាប់",
    saveConfig: "ចុច យល់ព្រម ដើម្បី រក្សា ទុក ការ កំណត់ រចនា សម្ព័ន្ធ",
    warningTips: "មាន រថ យន្ត ដែល ត្រូវការ ការ យក ចិត្ត ទុក ដាក់ ពី បុគ្គលិក ប្រតិបត្តិ ការ និង ថែទាំ សូម យក ចិត្ត ទុក ដាក់ ទៅ លើ វា ទាន់ ពេល វេលា ។ រថយន្ត ក្រៅ បណ្តាញ ផ្សេង ទៀត {offline} ឈប់ {warnings} រថយន្ត តាម ប្រព័ន្ធ អ៊ីនធឺណិត។",
    normalTips: "រថយន្ត នេះ មាន សុខភាព ល្អ",
    charging: "ការ ចោទ ប្រកាន់",
    uncharged: "មិន ត្រូវ បាន ចោទ ប្រកាន់",
    /** agvstate_list.vue.vue end */

    /** cacheAgvBasketNum.vue start */
    cacheMachine: "កណ្ដាល​ពណ៌​លឿង​ម៉ាស៊ីន​ឃ្លាំង​សម្ងាត់",
    step: "ជំហាន",
    cmTips: "ស្រទាប់​ណាមួយ (ចំនួន​កញ្ចប់​ភ្លឺ) - [ក្រុម]",
    stepErrTips: "បរាជ័យក្នុងការទទួលបានព័ត៌មានជំហាន",
    /** agvstate_list.vue.vue end */

    /** door.vue start */
    openDoor: "ទ្វារ បើក",
    closeDoor: "បិទ",
    confirmOpenDoor: "បញ្ជាក់ ថា ទ្វារ បើក",
    confirmCloseDoor: "អះអាង​ការ​បិទ​ច្រក",
    /** door.vue end */

    /** offline_point_map.vue start */
    offlineDays: "ចំនួនថ្ងៃដែល trolley បានបិទក្រៅ [ប៉ុន្មានថ្ងៃចុងក្រោយ]",
    offlineTable: "តារាង​ព័ត៌មាន​ចំណុច​ក្រៅ​បណ្ដាញ",
    origin: "ដើមកំណើត",
    oneSpan: "មួយ ស្បល",
    twoSpan: "២. ២ ស្ប.",
    tips01: "តារាង ចំណុច មិន ត្រូវ បាន កំណត់ រចនា សម្ព័ន្ធ ទេ",
    tips02: "ព័ត៌មាន ម៉ាស៊ីន មិន ត្រូវ បាន កំណត់ រចនា សម្ព័ន្ធ ទេ",
    machineConfig: "ការ កំណត់ រចនា សម្ព័ន្ធ ម៉ាស៊ីន",
    makeSvgErrTips01: "ម៉ាស៊ីន {id} កំហុស​ក្នុង​ការ​កំណត់​រចនាសម្ព័ន្ធ​ប៊ីត​ដាក់",
    makeSvgErrMsg01: "ចំណុច​ដុក​មិន​បាន​កំណត់​រចនាសម្ព័ន្ធ​ឡើយ, ចំណុចចត: {doPoint}, ចំណុច​ចេញ: {exitPoint}",
    makeSvgErrMsg02: "លេខចង្អុលមិនមានវត្តមាន, ចំណុចចត: {doPoint}, ចំណុច​ចេញ: {exitPoint}",
    pointGetfail: "បាន​បរាជ័យ​ក្នុង​ការ​ទទួល​ចំណុច​ក្រៅ​បណ្ដាញ",
    /** offline_point_map.vue end */

    /** station.vue start */
    gxAbutment: "ដំណើរការ​បង្កប់ (ជម្រើស)",
    abutmentInfo: "ព័ត៌មាន ចត ម៉ាស៊ីន",
    stationQueryFail01: "ព័ត៌មាន ម៉ាស៊ីន សំណួរ បរាជ័យ",
    stationQueryFail02: "បរាជ័យ ក្នុង ការ សួរ មតិ យោបល់ ម៉ាស៊ីន ពេល វេលា ពិត",
    stationQueryFail03: "វា មិន ត្រូវ បាន ផ្គូផ្គង ទៅ នឹង ម៉ាស៊ីន ចត ទេ",
    stationQueryFail04: "បរាជ័យ ក្នុង ការ សួរ ពី ស្ថានភាព ពេលវេលា ពិត របស់ ម៉ាស៊ីន",
    stationQueryFail05: "បរាជ័យ ក្នុង ការ សួរ សំណួរ ព័ត៌មាន ដែល បាន រិះ គន់ របស់ ម៉ាស៊ីន",
    /** station.vue end */

    /** stationCardList.vue start */
    stationInfo: "ព័ត៌មាន ម៉ាស៊ីន",
    abutmentPoint: "ចំណុច ចត",
    threshold: "កម្រិត ពន្លឺ ច្រក ម៉ាស៊ីន",
    enableOrNot: "ថា តើ វា ត្រូវ បាន អនុញ្ញាត ឬ អត់",
    feedingStatus: "ស្ថានភាពផ្ទុក",
    blankingStatus: "ឋានៈមិនផ្ទុក",
    feedQuantity: "ចំនួន ចំណី",
    dischargeQuantity: "ចំនួន អ្នក ដែល មិន បាន ចាញ់",
    card: "កាត",
    dockingSteps: "ជំហាន ចត",
    stationState01: "ព័ត៌មាន កំណត់ ឡើង វិញ ម៉ាស៊ីន",
    stationState02: "ព័ត៌មានសម្ភារៈម៉ាស៊ីន",
    stationState03: "AGVs ត្រូវ បាន អនុញ្ញាត ឱ្យ ចាប់ ផ្តើម ការ បញ្ជូន",
    stationState04: "AGVs ត្រូវ បាន អនុញ្ញាត ឲ្យ ចាក ចេញ",
    stationState05: "ម៉ាស៊ីន គឺ ខុស ប្រក្រតី",
    stationState06: "ជូន ដំណឹង ដល់ AGV ថា ត្រៀម ខ្លួន ជា ស្រេច ដើម្បី បត់",
    stationState07: "សុំ AGV បញ្ឈប់ ការ ចម្លង",
    queryStepFail: "ជំហាន ចត សំណួរ បាន បរាជ័យ",
    responseFail: "ការ ឆ្លើយ តប បាន បរាជ័យ",
    queryAvgFail: "បាន បរាជ័យ ក្នុង ការ សួរ សំណួរ ឃ្លាំង ស្ថានភាព AGV",
    normal: "ធម្មតា"
    /** stationCardList.vue end */
    
  }
  
}