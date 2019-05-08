import React, {Component, Stylesheet} from 'react';
import ReactNative, {Text, View, TextInput, AppRegistry} from 'react-native';
import { Formik } from 'formik';


class FirstName extends React.Component {


}

class Lastname extends React.Component {

	
}

class Age extends React.Component {

	
}

class Instruments extends React.Component {

	
}

class SkillLevel extends React.Component {

	
}

class Location extends React.Component {

	
}

class AskForImage extends React.Component {
	Constructor (
		props(this.props);
		super(props);
		);
	this.state = {
		defaultSelector: fromCamerRoll;
	}
		

			AppRegistry.registerComponent(
			<View styles={{flex: 1, flex-position: vertical,}}>
				<View styles={{flex: 3}}> 
					<form> 
						<Text> 
						 	Insert a profile picture. For best results use an image of you. 
						</Text>
						<TextInput type="/profileImag" placeholder={uri:}> 
						<Buton> Submit </Button> 

					
						<Button styles="leftClicker"> 
							
						</Button>

						<Button styles="rightClicker"> 
							
						</Button>

						<Text> 
							Upload from computer. 
						</Text>
						<Text> 
							From Drive
						</Text> 
						<Text> 
							From Folders
						</Text>
						<Text>
							From Camera Roll
						</Text>
					</form>

				</View> 
				<View styles={{flex: 5}}> 
					<ImageBackground  source={{}} /> 
				</View> 
			</View>
	)
}



export const UserEmail = props => (
  <Formik
    initialValues={{ email: '' }}
    onSubmit={values => console.log(values)}
  >
    {props => (
      <View>
        <TextInput
          onChangeText={props.handleChange('email')}
          onBlur={props.handleBlur('email')}
          value={props.values.email}
        />
        <Button onPress={props.handleSubmit} title="Submit" />
      </View>
    )}
  </Formik>
);

export const UserName = props => (
  <Formik
    initialValues={{ name: '' }}
    onSubmit={values => console.log(values)}
  >
    {props => (
      <View>
        <TextInput
          onChangeText={props.handleChange('name')}
          onBlur={props.handleBlur('name')}
          value={props.values.name}
        />
        <Button onPress={props.handleSubmit} title="Submit" />
      </View>
    )}
  </Formik>
);

 export const UserEmail = props => (
  <Formik
    initialValues={{ password: '' }}
    onSubmit={values => console.log(values)}
  >
    {props => (
      <View>
        <TextInput
          onChangeText={props.handleChange('email')}
          onBlur={props.handleBlur('email')}
          value={props.values.email}
        />
        <Button onPress={props.handleSubmit} title="Submit" />
      </View>
    )}
  </Formik>
);






let styles = Stylesheet.create(

	);

AppRegistry.registerApp( 
	
		render(
			return {
				<App>
					<View> 
						<ImageBackground> 	
							<FirstName /> 
							<Lastname /> 
							<Instruments /> 
							<SkillLevel />
							<SelectTab />

							<AskForImage>	

							</AskForImage>  
						</ImageBackground> 
					</View> 
				</App>
			}
	)
);