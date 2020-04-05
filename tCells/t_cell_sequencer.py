from tensorflow.keras import *
from tensorflow.keras.models import load_model
import numpy as np
import os

def t_cell_sequencer(epitope_sequence):
    tcr_j = load_model('models/TCR_J_Segment_Predictor.hdf5')
    tcr_v = load_model('models/TCR_V_Segment_Predictor.hdf5')


    # J
    j_classes = ['TRBJ2-7*01', 'TRBJ2-1*01', 'TRBJ2-2*01', 'TRBJ1-2*01', 'TRBJ2-5*01', 'TRBJ1-5*01', 'TRBJ2-3*01', 'TRBJ1-1*01', 
    'TRBJ1-3*01', 'TRBJ2-4*01', 'TRBJ1-4*01', 'TRBJ2-6*01', 'TRBJ1-6*01', 'TRBJ1-6*02', 'TRBJ1-4*02', 'TRBJ1-5*02', 'TRAJ31*01', 
    'TRAJ40*01', 'TRAJ34*01', 'TRAJ42*01', 'TRAJ12*01', 'TRAJ20*01', 'TRAJ3*01', 'TRAJ13*01', 'TRAJ23*01', 'TRAJ5*01', 'TRAJ11*01', 
    'TRAJ56*01', 'TRAJ43*01', 'TRAJ36*01', 'TRAJ37*01', 'TRAJ29*01', 'TRAJ30*01', 'TRAJ52*01', 'TRAJ28*01', 'TRAJ47*01', 'TRAJ54*01', 
    'TRAJ24*01', 'TRAJ45*01', 'TRAJ53*01', 'TRAJ4*01', 'TRAJ41*01', 'TRAJ9*01', 'TRAJ24*02', 'TRAJ32*01', 'TRAJ48*01', 'TRAJ35*01', 
    'TRAJ15*01', 'TRAJ6*01', 'TRAJ49*01', 'TRAJ14*01', 'TRAJ10*01', 'TRAJ16*01', 'TRAJ18*01', 'TRAJ21*01', 'TRAJ33*01', 'TRAJ22*01', 
    'TRAJ39*01', 'TRAJ44*01', 'TRAJ27*01', 'TRAJ8*01', 'TRAJ7*01', 'TRAJ57*01', 'TRAJ17*01', 'TRAJ50*01', 'TRAJ26*01', 'TRAJ38*01', 
    'TRAJ46*01']

    encoder_dict_j = {'a':2,'b':3,'c':4,'d':5,'e':6,'f':7,'g':8,'h':9,'i':10,
            'j':11,'k':12,'l':13,'m':14,'n':15,'o':16,'p':17,'q':18,'r':19,'s':20,
            't':21,'u':22,'v':23,'w':24,'x':25,'y':26,'z':27,'=':28}
    encoded_epitope_j = []
    for i in epitope_sequence:
        encoded_epitope_j.append(encoder_dict_j[i])
    
    for i in range(22-len(encoded_epitope_j)):
        encoded_epitope_j.append(0)
    
    encoded_epitope_j = np.asarray(encoded_epitope_j)
    a = tcr_j.predict(encoded_epitope_j)

    J_SEGMENT = j_classes[np.argmax(a)]

    # V
    v_classes = ['TRBV6-8*01', 'TRBV7-2*01', 'TRBV9*01', 'TRBV2*01', 'TRBV4-3*01', 'TRBV28*01', 'TRBV27*01', 'TRBV19*01', 'TRBV18*01', 
    'TRBV29-1*01', 'TRBV13-1*01', 'TRBV24*01', 'TRBV12-1*01', 'TRBV26*01', 'TRBV20-1*01', 'TRBV14*01', 'TRBV4-2*01', 'TRBV10-2*01', 
    'TRBV7-8*01', 'TRBV10-3*01', 'TRBV11-2*01', 'TRBV7-9*01', 'TRBV4-1*01', 'TRBV6-6*01', 'TRBV6-1*01', 'TRBV6-2*01', 'TRBV6-5*01', 
    'TRBV6-9*01', 'TRBV12-4*01', 'TRBV24-1*01', 'TRBV5-1*01', 'TRBV7-3*01', 'TRBV12-3*01', 'TRBV5-5*01', 'TRBV16*01', 'TRBV30*01', 
    'TRBV6-4*01', 'TRBV3-1*01', 'TRBV7-6*01', 'TRBV13-2*01', 'TRBV1*01', 'TRBV13-3*01', 'TRBV9*02', 'TRBV29*01', 'TRBV5-8*01', 'TRBV5-6*01', 
    'TRBV7-2*02', 'TRBV25-1*01', 'TRBV13*01', 'TRBV15*01', 'TRBV7-7*01', 'TRBV5-4*01', 'TRBV11-1*01', 'TRBV7-2*03', 'TRBV12-5*01', 
    'TRBV11-3*01', 'TRBV10-1*01', 'TRBV6-3*01', 'TRBV7-4*01', 'TRBV7-9*03', 'TRBV17*01', 'TRBV4*01', 'TRBV5*01', 'TRBV13-1*02', 'TRBV31*01', 
    'TRBV19*02', 'TRBV3*01', 'TRBV20*01', 'TRBV12-2*01', 'TRBV6-4*02', 'TRBV23*01', 'TRBV23-1*01', 'TRBV2-1*01', 'TRBV21-1*01', 'TRBV6-7*01', 
    'TRBV6-6*02', 'TRAV27*01', 'TRAV12-1*01', 'TRAV5*01', 'TRAV13-1*01', 'TRAV26-2*01', 'TRAV6*01', 'TRAV12-2*01', 'TRAV17*01', 'TRAV38-1*01', 
    'TRAV4*01', 'TRAV8-4*01', 'TRAV16*01', 'TRAV19*01', 'TRAV1-2*01', 'TRAV9-2*01', 'TRAV14/DV4*01', 'TRAV29/DV5*01', 'TRAV9-4*01', 'TRAV14-1*01', 
    'TRAV14-3*01', 'TRAV21*01', 'TRAV26-1*01', 'TRAV22*01', 'TRAV6D-7*01', 'TRAV24*01', 'TRAV4-2*01', 'TRAV20*01', 'TRAV21/DV12*01', 'TRAV35*01', 
    'TRAV4D-4*01', 'TRAV6-3*01', 'TRAV12-3*01', 'TRAV8-3*01', 'TRAV39*01', 'TRAV38-2/DV8*01', 'TRAV30*01', 'TRAV8-2*01', 'TRAV8-6*01', 'TRAV3*01', 
    'TRAV13-2*01', 'TRAV10*01', 'TRAV41*01', 'TRAV2*01', 'TRAV8-1*01', 'TRAV25*01', 'TRAV1-1*01', 'TRAV34*01', 'TRAV40*01', 'TRAV18*01', 'TRAV7*01']

    encoder_dict_v = {'a':2,'b':3,'c':4,'d':5,'e':6,'f':7,'g':8,'h':9,'i':10,
            'j':11,'k':12,'l':13,'m':14,'n':15,'o':16,'p':17,'q':18,'r':19,'s':20,
            't':21,'u':22,'v':23,'w':24,'x':25,'y':26,'z':27,'=':28}
    encoded_epitope_v = []
    for i in epitope_sequence:
        encoded_epitope_v.append(encoder_dict_v[i])
    
    for i in range(22-len(encoded_epitope_v)):
        encoded_epitope_v.append(0)
    
    encoded_epitope_v = np.asarray(encoded_epitope_v)
    a = tcr_v.predict(encoded_epitope_v)

    V_SEGMENT = v_classes[np.argmax(a)]
    


    #CDR3
    num_encoder_tokens = 41
    num_decoder_tokens = 41
    latent_dimension = 40
    # Define an input sequence and process it.
    encoder_inputs = Input(shape=(None, num_encoder_tokens))
    encoder = LSTM(latent_dimension, return_state=True)
    encoder_outputs, state_h, state_c = encoder(encoder_inputs)

    encoder_states = [state_h, state_c]

    decoder_inputs = Input(shape=(None, num_decoder_tokens))

    decoder_lstm = LSTM(latent_dimension, return_sequences=True, return_state=True)
    decoder_outputs, _, _ = decoder_lstm(decoder_inputs, initial_state=encoder_states)
    decoder_dense = Dense(num_decoder_tokens, activation='softmax')
    decoder_outputs = decoder_dense(decoder_outputs)

    tcr_cdr3 = Model([encoder_inputs, decoder_inputs], decoder_outputs)
    tcr_cdr3.load_weights('models/CDR3_Predictor.hdf5')

    encoder_model = Model(encoder_inputs, encoder_states)

    decoder_state_input_h = Input(shape=(latent_dimension,))
    decoder_state_input_c = Input(shape=(latent_dimension,))
    decoder_states_inputs = [decoder_state_input_h, decoder_state_input_c]
    decoder_outputs, state_h, state_c = decoder_lstm(
        decoder_inputs, initial_state=decoder_states_inputs)
    decoder_states = [state_h, state_c]
    decoder_outputs = decoder_dense(decoder_outputs)
    decoder_model = Model(
        [decoder_inputs] + decoder_states_inputs,
        [decoder_outputs] + decoder_states)
    
    def predictor(input_seq):
        states_value = encoder_model.predict(input_seq.reshape(1,input_seq.shape[0],input_seq.shape[1]))
        target_seq = np.zeros((1, 1, num_decoder_tokens))
        target_seq[0, 0, 0] = 1

        decoded_list = []
        condition = True
        while (condition):
            output_tokens, h, c = decoder_model.predict([target_seq] + states_value)
            sampled_token_index = np.argmax(output_tokens[0, -1, :])
            decoded_list.append(sampled_token_index)

            if (sampled_token_index == 41 or len(decoded_list) == 44):
                condition = False
            
            target_seq = np.zeros((1,1, num_decoder_tokens))
            target_seq[0,0,sampled_token_index] = 1

            states_value = [h,c]
        
        encoder_dict = {'+':1,'a':2,'b':3,'c':4,'d':5,'e':6,'f':7,'g':8,'h':9,'i':10,
                    'j':11,'k':12,'l':13,'m':14,'n':15,'o':16,'p':17,'q':18,'r':19,'s':20,
                    't':21,'u':22,'v':23,'w':24,'x':25,'y':26,'z':27,'-':28,'*':29,'1':30,
                    '2':31,'3':32,'4':33,'5':34,'6':35,'7':36,'8':37,'9':38,'0':39,'=':40}
        inverse_dict = {v: k for k, v in encoder_dict.items()}
        output = ''
        for i in decoded_list:
            if (i == 0):
                continue
            output += inverse_dict[i]
        return output.upper()
    
    encoder_dict2 = {'+':1,'a':2,'b':3,'c':4,'d':5,'e':6,'f':7,'g':8,'h':9,'i':10,
            'j':11,'k':12,'l':13,'m':14,'n':15,'o':16,'p':17,'q':18,'r':19,'s':20,
            't':21,'u':22,'v':23,'w':24,'x':25,'y':26,'z':27,'-':28,'*':29,'1':30,
            '2':31,'3':32,'4':33,'5':34,'6':35,'7':36,'8':37,'9':38,'0':39,'=':40}
    cdr3_input = []
    for i in epitope_sequence:
        cdr3_input.append(encoder_dict2[i])
    
    one_hot_encoder_list = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,
                        17,18,19,20,21,22,23,24,25,26,27,28,29,30,
                        31,32,33,34,35,36,37,38,39,40]
    one_hot_encoder_list = np.asarray(one_hot_encoder_list)
    b = np.zeros((one_hot_encoder_list.size, one_hot_encoder_list.max()+1))
    b[np.arange(one_hot_encoder_list.size),one_hot_encoder_list] = 1
    dict_for_oneHot = b.tolist()

    real_input = []
    for num in cdr3_input:
        real_input.append(dict_for_oneHot[num])
    
    CDR3_SEGMENT = predictor(real_input)

    print('finished')
    return [V_SEGMENT, J_SEGMENT, CDR3_SEGMENT]


os.chdir("C:/Users/vansh/Desktop/tCells")
print(os.getcwd())
print(t_cell_sequencer('LSOPQWFD'))