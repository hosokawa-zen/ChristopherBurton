import React, {useEffect, useState} from 'react';
import {Image, Platform, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import images from "../../assets/images";

const styles = StyleSheet.create({
	iosPadding: {
		height: 40,
		justifyContent: 'center',
	},
	viewContainer: {
		marginBottom: 8,
		paddingHorizontal: 8,
		borderWidth: 1,
		borderRadius: 4,
		justifyContent: 'center',
		width: '100%'
	},
	pickerText: {
		fontSize: 16,
		paddingVertical: 6
	},
	icon: {
		right: 16
	},
	iosIcon: {
		paddingVertical: 10
	},
	loading: {
		padding: 0
	}
});

export const Select = ({
	options = [],
	placeholder,
	onChange,
	disabled,
	iconInvisible,
	value: initialValue,
}) => {
	const [selected, setSelected] = useState(!Array.isArray(initialValue) && (initialValue === 0?-1:initialValue));
	const items = options.map(option => ({ label: option.text, value: (option.value ===0)?-1:option.value }));
	const pickerStyle = {
		...styles.viewContainer,
		...(Platform.OS === 'ios' ? styles.iosPadding : {}),
		borderColor: 'grey',
		backgroundColor: 'black'
	};

	useEffect(() => {
		setSelected(initialValue === 0?-1:initialValue);
	}, [selected, initialValue]);

	const Icon = () => (
		<Image style={{tintColor: 'white', width: 18, height: 11, marginRight: 12}} source={images.ic_dropdown_2}  />
	);
	return (
		<RNPickerSelect
			items={items}
			placeholder={placeholder ? { label: placeholder, value: null } : {}}
			useNativeAndroidPickerStyle={false}
			value={selected}
			disabled={disabled}
			onValueChange={(value) => {
				setSelected(value);
				onChange(value === -1?0:value);
			}}
			style={{
				viewContainer: pickerStyle,
				inputAndroidContainer: pickerStyle
			}}
			Icon={iconInvisible?null:Icon}
			textInputProps={{ style: { ...styles.pickerText, color: selected ? 'white' : 'gray' } }}
		/>
	);
};
