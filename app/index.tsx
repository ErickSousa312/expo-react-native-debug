import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  TextInput,
  Pressable,
  Text,
} from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { SkiaComponent } from '@/components/echarts/graficEcharts';
import { AxiosGet } from '@/components/axios/axiosGet';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import MonthYear from '@/components/formData/monthAndYear';

function ModalScreen() {
  const [option, setData] = useState({});
  const [dataFetch, setDataFetch] = useState();
  const [refreshing, setRefreshing] = useState(true);
  const navigation = useNavigation();

  const fetchData = async (ano?: any, mes?: any) => {
    try {
      const response = await AxiosGet('atendimentosSexo', {
        mes: mes || '',
        ano: ano || '',
      });
      setRefreshing(false);
      setDataFetch(response.data);
      const totalAtendimentosArray = response.data.map(
        (item: any) => item.Total_Ocorrencias,
      );
      const arrayString = response.data.map((item: any) =>
        String(item.Total_Ocorrencias),
      );

      const labelVeiculos = response.data.map((item: any) => item.SexoDS);

      setData((prevState) => ({
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        // title: {
        //   text: 'Atendimentos por Sexo',
        //   left: 'center',
        //   top: '1%',
        // },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          bottom: 0,
          left: 'center',
          Data: arrayString,
        },
        grid: {
          top: '0%',
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true,
        },
        series: [
          {
            label: {
              formatter: '{d|%{d}}',
              show: true,
              position: 'inside',
              size: 40,
              length: 200,
              lineHeight: 56,
              rich: {
                d: {
                  color: '#4C5058',
                  padding: [10, 10, 10, 10],
                  fontSize: 14,
                  fontWeight: 'bold',
                  lineHeight: 33,
                  marginLeft: 100,
                },
              },
            },
            labelLine: {
              show: false,
            },
            radius: ['30%', '60%'],
            avoidLabelOverlap: false,
            type: 'pie',
            itemStyle: {
              borderRadius: 8,
            },
            data: response.data.map((item: any) => ({
              name: item.SexoDS !== null ? item.SexoDS : 'Não informado',
              value: item.Total_Ocorrencias,
            })),
            top: -40,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={fetchData}
          progressViewOffset={60}
        />
      }
    >
      <SkiaComponent option={option} height={350} />
      {/* <TableData dados={dataFetch}></TableData> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100C2A',
    width: 'auto',
  },

});
export default gestureHandlerRootHOC(ModalScreen);
