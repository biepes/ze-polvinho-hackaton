package br.ufsc.bridge.back.modules.model;

import java.util.List;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;

@Data
@Getter
@Setter
public class PesquisaAvaliacaoDto {

	private String versao;
	private String grauSatisfacao;

}
