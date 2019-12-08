import Vue from 'vue-native-core';
import Vuex from 'vuex';
import AsyncStorage from '@react-native-community/async-storage';


Vue.use(Vuex);

const state = {
	lang: 'IND',
};

const mutations = {
	CHANGE_LANG(state, lang) {
		state.lang = lang;
	}
};

const actions = {
	async changeLang(context, lang) {
		context.commit('CHANGE_LANG', lang);
		await AsyncStorage.setItem('@lang', lang);
	}
};

const getters = {
	is_ind(state) {
		return state.lang == "IND";
	},
	ui(state) {
		const lang = state.lang;
		let ui;
		switch(lang) {
			case 'IND': 
				ui = {
					loginScreen: {
						head_title: 'Form Login',
						register: 'Belum punya akun? Registrasi',
					},
					registerScreen: {
						head_title: 'Form Registrasi',
						hp: 'No Handphone',
						repeat: 'Ulangi Password',
						back: 'Kembali',
						submit: 'Daftar'
					},
					homeScreen: {
						library_title: 'Library HPT',
						library_subtitle: 'Daftar hama, penyakit, dan abiotik pada tanaman',
						cons_title: 'Konsultasi',
						cons_subtitle: 'Ajukan pertanyaan seputar tanaman anda kepada para ahli',
						notif: 'Notifikasi',
						more_notif: 'Lihat semua notifikasi',
					},
					libraryScreen: {
						uchama: 'Hama',
						lchama: 'hama',
						ucpenyakit: 'Penyakit',
						lcpenyakit: 'penyakit',
						ucabiotik: 'Abiotik',
						lcabiotik: 'abiotik',
						search: 'Cari',
					},
					detailScreen: {
						desc: 'Deskripsi',
						indi: 'Gejala',
						cont: 'Pengendalian',
					},
					konsultasiScreen: {
						title: 'Konsultasi',
						ask: 'Ajukan pertanyaan',
						respon: 'Respon pertanyaan anda',
					},
					tanyaScreen: {
						title: 'Konsultasi',
						judul: 'Judul pertanyaan',
						jenis: 'Jenis',
						opthama: 'Hama',
						optpenyakit: 'Penyakit',
						optabiotik: 'Abiotik',
						gejala: 'Gejala yang tampak',
						upload: 'Upload Gambar',
						camera: 'Dari Kamera',
						galery: 'Dari Galeri',
					},
					detailPertanyaanScreen: {
						title: 'Konsultasi',
						answer: 'Jawaban'
					},
					notifikasiScreen: {
						all: 'Semua Notifikasi',
						detail: 'Lihat Detail'
					}
				};
				break;
			case 'ENG': 
				ui = {
					loginScreen: {
						head_title: 'Login Form',
						register: "Doesn't have account? Register",
					},
					registerScreen: {
						head_title: 'Register Form',
						hp: 'Phone Number',
						repeat: 'Repeat Password',
						back: 'Back',
						submit: 'Register'
					},
					homeScreen: {
						library_title: 'HPT Library',
						library_subtitle: 'List of pests, diseases and abiotics in plants',
						cons_title: 'Consultation',
						cons_subtitle: 'Ask questions about your plants to experts',
						notif: 'Notification',
						more_notif: 'Read all notification',
					},
					libraryScreen: {
						uchama: 'Pests',
						lchama: 'pest',
						ucpenyakit: 'Diseases',
						lcpenyakit: 'disease',
						ucabiotik: 'Abiotics',
						lcabiotik: 'abiotic',
						search: 'Search for',
					},
					detailScreen: {
						desc: 'Description',
						indi: 'Indication',
						cont: 'Control',
					},
					konsultasiScreen: {
						title: 'Consultation',
						ask: 'Ask questions',
						respon: 'Respond to your question',
					},
					tanyaScreen: {
						title: 'Consultation',
						judul: 'Question',
						jenis: 'Type',
						opthama: 'Pest',
						optpenyakit: 'Disease',
						optabiotik: 'Abiotic',
						gejala: 'Visible symptoms',
						upload: 'Upload Picture',
						camera: 'From Camera',
						galery: 'From Galery',
					},
					detailPertanyaanScreen: {
						title: 'Consultation',
						answer: 'Answer'
					},
					notifikasiScreen: {
						all: 'All Notification',
						detail: 'More Detail'
					}
				};
				break;
		}
		return ui;
	}
}

const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});

export default store;