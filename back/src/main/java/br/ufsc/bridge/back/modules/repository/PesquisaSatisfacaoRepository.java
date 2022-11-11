package br.ufsc.bridge.back.modules.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import br.ufsc.bridge.back.modules.model.PesquisaAvaliacaoDto;
import br.ufsc.bridge.back.modules.model.PesquisaSatisfacao;
import br.ufsc.bridge.back.modules.model.GrauAvaliacaoDto;
import br.ufsc.bridge.back.modules.model.PesquisaSatisfacaoGroupDto;

@Repository
public interface PesquisaSatisfacaoRepository extends MongoRepository<PesquisaSatisfacao, String>  {

	@Aggregation(pipeline = {
			"{'$match' : {'grauSatisfacao' : {'$ne' : null}}}",
			"{ '$group': { '_id': { versao: '$versao', grauSatisfacao: '$grauSatisfacao'}, quantidade: { $count: {} }}}",
	})
	List<PesquisaSatisfacaoGroupDto> groupByLastnameAnd();

}
