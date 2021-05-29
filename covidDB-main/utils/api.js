module.exports.api = () => {
  let api = {
    state_wise: "https://api.covid19india.org/csv/latest/state_wise.csv",
    state_wise_daily:
      "https://api.covid19india.org/csv/latest/state_wise_daily.csv",
    districts: "https://api.covid19india.org/csv/latest/districts.csv",
    vaccine:
      "http://api.covid19india.org/csv/latest/vaccine_doses_statewise.csv",
    cowin_vaccine_data_statewise:
      "http://api.covid19india.org/csv/latest/cowin_vaccine_data_statewise.csv",
    case_time_series:
      "https://api.covid19india.org/csv/latest/case_time_series.csv",
    state_time_series: "https://api.covid19india.org/csv/latest/states.csv",
    district_wise_data:
      "https://api.covid19india.org/csv/latest/district_wise.csv",
    data_by_state_by_name:
      "https://api.covid19india.org/csv/latest/state_wise.csv",
    hopitalList: "https://life-api.coronasafe.network/data/hospital_v2.json",
    // "https://life-api.coronasafe.network/data/hospital_clinic_centre_verified.json",
    oxygenList: "https://life-api.coronasafe.network/data/oxygen_v2.json",
    // "https://life-api.coronasafe.network/data/oxygen_verified.json",
    diagnosis: "https://api.infermedica.com/covid19/diagnosis",
    triage: "https://api.infermedica.com/covid19/triage",
  };
  return api;
};
