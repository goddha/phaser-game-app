const inputProperty = {
	property: {
		id: 'inputAmount',
		type: 'number',
		text: '0',
		fontSize: '25px',
		color: '#ffffff',
		fontFamily: 'Kanit',
		align: 'right',
		autoComplete: 'off',
		min: 0,
	},
	innerHtmlCss: `
    #inputAmount::-webkit-inner-spin-button, 
    #inputAmount::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
    }
    #inputAmount{
      -moz-appearance:textfield;
    }
    `,
}
export default inputProperty
